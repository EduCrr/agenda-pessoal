import React, { useState, } from "react";
import api from "../../api";
import * as C from "./styles";
import { useSelector } from "react-redux";
import InputMask from 'react-input-mask';
import { Header } from "../../components/Header";
import { MensagemErro } from "../../components/MensagemErro";
import { toast } from 'react-toastify';
export const AdicionarUsuario = () => {
  let user = useSelector((state) => state.user);
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [telefone, setTelefone] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [selectedRole, setSelectedRole] = useState('');
  const [mostrarErro, setMostrarErro] = useState(false);
  const [erros, setErros] = useState([]);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMostrarErro(false)
    let errors = [];

    if (!nome || !nome.trim()) {
      errors.push("Preencha o campo nome");
    }

    const cpfNumeros = cpf ? cpf.replace(/[^0-9]/g, '') : '';

    if (!cpfNumeros.match(/^\d{11}$/)) {
      errors.push("O campo CPF deve estar no formato XXX.XXX.XXX-XX");
    }

    if (!email || !email.trim()) {
      errors.push("Preencha o campo email");
    }
  
    if (!password) {
      errors.push("Preencha o campo senha");
    } else {
      if (password.length < 8) {
        errors.push("A senha deve ter pelo menos 8 caracteres");
      }
    
      if (!/[a-zA-Z]/.test(password)) {
        errors.push("A senha deve conter pelo menos 1 letra");
      }
    }

    const telefoneNumeros = telefone ? telefone.replace(/[^0-9]/g, '') : '';

    if (!telefoneNumeros.match(/^\d{11}$/)) {
      errors.push("O campo telefone deve estar no formato (99) 99999-9999");
    }

    if (selectedRole === '') {
      errors.push("Preencha o tipo");
    }
  
    const dataNumeros = dataNascimento ? dataNascimento.replace(/[^0-9]/g, '') : '';

    if (dataNumeros.length !== 8) {
      errors.push('O campo Data de Nascimento deve estar no formato yyyy-MM-dd');
    }
  
    if (!username || !username.trim()) {
      errors.push("Preencha o campo nome usuário");
    }

    if (errors.length === 0) {
      let pessoaData = {
        tipos: [
          selectedRole
        ],
        usuario: {
          'cpf': cpf,
          'dataNascimento': dataNascimento,
          'email': email,
          'nome': nome,
          'password': password,
          'telefone': telefone,
          'username': username
        }
      };
      // Enviar os dados da pessoa para a API
      try {
        let json = await api.createUsuario(pessoaData, user.token);
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

  return (
    <>
    <Header />
    <C.Container>
      <h3>Adicionar usuário</h3>
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
                <input type="text" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="adjust">
                <label>Senha</label>
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
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
                <label>Tipo de usuário</label>
                <select id="roleSelect" value={selectedRole} onChange={handleRoleChange}>
                <option value="">Selecione tipo</option>
                <option value="ROLE_ADMIN">ADMIN</option>
                  <option value="ROLE_USER">USER</option>
                </select>
              </div>
            </div>
            <div className="getTwo">
              <div className="adjust">
                <label>Data de nascimento</label>
                <InputMask
                    mask="9999-99-99"
                    placeholder="Data de nascimento"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
              </div>
              <div className="adjust">
                <label>Nome usuário</label>
                <input type="text" placeholder="Nome usuário" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
            </div>
            <div className="btnSend">
              <button type="submit">Criar</button>
            </div>
        </form>
      </div>
    </C.Container>
    </>
  );
};

