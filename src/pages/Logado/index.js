import React, { useState, useEffect, useRef } from "react";
import api from "../../api";
import * as C from "./styles";
import { useSelector } from "react-redux";
import InputMask from 'react-input-mask';
import { json, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { useDispatch } from "react-redux";
import { setName, setToken, setId } from "../../redux/reducers/userReducer";
import { setLogOut } from "../../redux/reducers/userReducer";
import { MensagemErro } from "../../components/MensagemErro";
import { toast } from 'react-toastify';

export const Logado = () => {
  const { id } = useParams();
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [telefone, setTelefone] = useState();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [oldPassword, setOldPassword] = useState();
  const dispatch = useDispatch();
  const [mostrarErro, setMostrarErro] = useState(false);
  const [erros, setErros] = useState([]);

  const getUserInfo = async () => {
    try {
      let json = await api.getUser(id, user.token);
      console.log(json)
      setNome(json.object.usuario.nome);
      setCpf(json.object.usuario.cpf);
      setDataNascimento(json.object.usuario.dataNascimento);
      setEmail(json.object.usuario.email);
      setTelefone(json.object.usuario.telefone);
      setUsername(json.object.usuario.username);
    } catch (error) {
      toast.error(error.response.data.message);
      return;
    }
   
  };

  useEffect(() => {
    getUserInfo();
    if(id != user.id){
      navigate("/");
    }
  
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];
    setMostrarErro(false)
    if (!nome || !nome.trim()) {
      errors.push("Preencha o campo nome");
    }
    
    const telefoneNumeros = telefone.replace(/[^0-9]/g, '');

    if (!telefoneNumeros.match(/^\d{11}$/)) {
      errors.push("O campo telefone deve estar no formato (99) 99999-9999");
    }

    const cpfNumeros = cpf.replace(/[^0-9]/g, '');

    if (!cpfNumeros.match(/^\d{11}$/)) {
      errors.push("O campo CPF deve estar no formato XXX.XXX.XXX-XX");
    }

    if (!email || !email.trim()) {
      errors.push("Preencha o campo email");
    }
   
    if (password) {
      if (password.length < 8) {
        errors.push("A senha deve ter pelo menos 8 caracteres");
      }

      if (!/[a-zA-Z]/.test(password)) {
        errors.push("A senha deve conter pelo menos 1 letra");
      }
    }

    if (oldPassword) {
      if (!oldPassword) {
        errors.push("Preencha o campo senha antiga");
      }
    }

    const dataNumeros = dataNascimento.replace(/[^0-9]/g, '');

    if (dataNumeros.length !== 8) {
      errors.push('O campo Data de Nascimento deve estar no formato yyyy-MM-dd');
    }

    if (!username || !username.trim()) {
      errors.push("Preencha o campo nome usuário");
    }

    if (errors.length === 0) {
      const data = {
        cpf,
        email,
        nome,
        dataNascimento,
        id,
        telefone,
        username
      };

      if (password) {
        try {
          const jsonPassword = await api.updatePassword(password, oldPassword, username, user.token);
        } catch (error) {
          setErros([error.response.data.message]);
          setMostrarErro(true);
          return;
        }
      }
      try {
        const json = await api.updateUser(data, user.token);
        toast.success(json.message);
      } catch (error) {
        setErros([error.response.data.message]);
        setMostrarErro(true);
      }
    } else {
      setErros(errors[0]);
      setMostrarErro(true);
    }
  }

  const handleClose = () => {
    setMostrarErro(false);
  };

  return (
    <>
      <Header/>
      <C.Container>
      <h3>Meu cadastro</h3>
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
                <label>E-mail</label>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="adjust">
                <label>Nome usuário</label>
                <input type="text" placeholder="Nome usuário" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
            </div>
            <div className="getTwo">
              <div className="adjust">
                <label>Telefone</label>
                <InputMask
                  mask="(99) 99999-9999"
                  placeholder="Telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              <div className="adjust">
                <label>Data de nascimento</label>
                <InputMask
                  mask="9999-99-99"
                  placeholder="Data de nascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </div>
             
            </div>
            <div className="getTwo">
              <div className="adjust">
                <label>Nova senha</label>
                <input type="password" placeholder="Nova Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="adjust">
                <label>Senha atual</label>
                <input type="password" placeholder="Senha atual" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
              </div>
            </div>
            <div className="btnSend">
              <button type="submit">Atualizar</button>
            </div>
        </form>
      </div>
    </C.Container>
    </>
  );
};

