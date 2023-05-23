import React, { useState, useEffect, useRef } from "react";
import api from "../../api";
import apiCep from "../../api";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import InputMask from 'react-input-mask';
import { MensagemErro } from "../../components/MensagemErro";
import { toast } from 'react-toastify';
export const Pessoa = () => {
  const { id } = useParams();
  let user = useSelector((state) => state.user);
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [bairro, setBairro] = useState();
  const [cep, setCep] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [logradouro, setLogradouro] = useState();
  const [numero, setNumero] = useState();
  const [pais, setPais] = useState();
  const [idUser, setIdUser] = useState();
  const [mostrarErro, setMostrarErro] = useState(false);
  const [erros, setErros] = useState([]);
  const [foto, setFoto] = useState("");
  const fileInputRef = useRef(null);
  const [imagemSelecionada, setImagemSelecionada] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    try {

      let json = await api.getSingleUser(id, user.token);

      setNome(json[0].pessoa.nome);
      setCpf(json[0].pessoa.cpf);
      setBairro(json[0].pessoa.endereco.bairro);
      setCep(json[0].pessoa.endereco.cep);
      setCidade(json[0].pessoa.endereco.cidade);
      setEstado(json[0].pessoa.endereco.estado);
      setLogradouro(json[0].pessoa.endereco.logradouro);
      setNumero(json[0].pessoa.endereco.numero);
      setPais(json[0].pessoa.endereco.pais)
      setIdUser(json[0].pessoa.id)
      setFoto(json[0].pessoa.foto);

    } catch (error) {
      navigate("/");
    }
    
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleNumeroChange = (event) => {
    const inputValue = event.target.value;

    // Filtra apenas os números
    const numerosApenas = inputValue.replace(/[^0-9]/g, '');

    setNumero(numerosApenas);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMostrarErro(false)
    let errors = [];

    if (!nome.trim()) {
      errors.push("Preencha o campo nome");
    }

    if (!cep.trim() || cep.replace(/[^0-9]/g, '').length !== 8) {
      errors.push('Preencha o campo CEP corretamente');
    }

    const cpfNumeros = cpf.replace(/[^0-9]/g, '');
    if (!cpfNumeros.match(/^\d{11}$/)) {
      errors.push("O campo CPF deve estar no formato XXX.XXX.XXX-XX");
    }

    if (!cidade.trim()) {
      errors.push("Preencha o campo cidade");
    }

    if (!estado.trim()) {
      errors.push("Preencha o campo estado");
    }

    if (!logradouro.trim()) {
      errors.push("Preencha o campo logradouro");
    }

    if (numero === '') {
      errors.push("Preencha o campo número");
    }

    if (!bairro.trim()) {
      errors.push("Preencha o campo bairro");
    }

    if (errors.length === 0) {
      // Construir objeto com os dados da pessoa
      const pessoaData = {
        cpf: cpf,
        endereco: {
          bairro: bairro,
          cep: cep,
          cidade: cidade,
          estado: estado,
          id: idUser,
          logradouro: logradouro,
          numero: numero,
          pais: pais
        },
        id: idUser,
        nome: nome
      };
  
      // Enviar os dados da pessoa para a API
      try {
        const json = await api.updatePessoa(pessoaData, user.token);
        toast.success(json.message);
      } catch (error) {
        setErros([error.response.data.message]);
        setMostrarErro(true);
        return;
      }
  
    } else {
      setErros(errors[0]);
      setMostrarErro(true);
    }
  }
  
  const handleClose = () => {
    setMostrarErro(false);
  };

  const handleSubmitFoto = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    if (!file) {
      return;
    }

    try {

      const response = await api.updatePhotoPessoa(idUser, file, user.token);
      console.log("Resposta da API:", response);
      toast.success(response.message);

    } catch (error) {
      setErros([error.response.data.message]);
      setMostrarErro(true);
    }
  };

  const buscarEnderecoPorCep = async (cep) => {
    try {
      const response = await apiCep.getCep(cep);

      if (response) {
        setBairro(response.bairro);
        setCidade(response.localidade);
        setEstado(response.uf);
        setLogradouro(response.logradouro);
        setNumero('');
      }
    } catch (error) {
      console.error("Erro ao buscar endereço por CEP:", error);
    }
  };

  const handleChangeCep = (e) => {
    setCep(e.target.value);
    if (e.target.value.length >= 7) {
      buscarEnderecoPorCep(e.target.value);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if(file){

      const reader = new FileReader();
      reader.onload = () => {
        setImagemSelecionada(reader.result);
      };
      reader.readAsDataURL(file);
    
    }else{
      setImagemSelecionada('');

    }
  };


  return (
    <>
    <Header />
    <C.Container>
      <h3>Editar pessoa</h3>
      {mostrarErro && <MensagemErro errors={erros} handleClose={handleClose} />}
      <div className="formUser">
        <form className="userInfoForm" onSubmit={handleSubmit}>
            <div className="getTwo">
              <div className="adjust">
                <label>Nome</label>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
              </div>
              <div className="adjust">
                <label>CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  placeholder="CPF"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
            </div>
            <div className="getTwo">
              <div className="adjust">
                <label>Bairro</label>
                <input placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
              </div>
              <div className="adjust">
                <label>CEP</label>
                <InputMask
                  mask="99999-999"
                  id="cep"
                  placeholder="Digite o CEP"
                  value={cep}
                  onChange={handleChangeCep}
                />
              </div>
            </div>
            <div className="getTwo">
              <div className="adjust">
                <label>Cidade</label>
                <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
              </div>
              <div className="adjust">
                <label>Estado</label>
                <input type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)}/>
              </div>
            </div>
            <div className="getTwo">
              <div className="adjust">
                <label>Logradouro</label>
                <input type="text" placeholder="logradouro" value={logradouro} onChange={(e) => setLogradouro(e.target.value)}/>
              </div>
              <div className="adjust">
                <label>Número</label>
                <input type="number" placeholder="Número" value={numero} onChange={handleNumeroChange} />
              </div>
            </div>
            <div className="btnSend">
              <button type="submit">Atualizar</button>
            </div>
        </form>
        <form className="formPhoto" onSubmit={handleSubmitFoto}>
          <label htmlFor="file-input" className="custom-file-button">
            Selecionar Arquivo
          </label>
          <input
            id="file-input"
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
           <div className="showPhoto">
            {imagemSelecionada && (
              <>
                <img src={imagemSelecionada} alt="Imagem Selecionada" style={{ width: "200px", height: "200px" }} />
                <button className="custom-file-button" type="submit">Enviar nova foto</button>

              </>
            )}
           </div>
        </form>
      </div>
    </C.Container>
    </>
  );
};

