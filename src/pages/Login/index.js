
import React, { useState, useEffect } from "react";
import api from "../../api";
import {Navigate} from 'react-router-dom';
import * as C from "./styles";
import { useDispatch } from "react-redux";
import { setName, setToken, setId } from "../../redux/reducers/userReducer";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rememberCredentials, setRememberCredentials] = useState(false);
  const dispatch = useDispatch();
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
    setEmail(storedEmail);
    setPassword(storedPassword);
    setRememberCredentials(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let json = await api.loginUser(password, email);
      console.log(json.username);
      if (json.accessToken !== "") {
        dispatch(setName(json.username));
        dispatch(setId(json.id));
        dispatch(setToken(json.accessToken));
        setRedirectToHome(true);
      }
      if (rememberCredentials) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Acesso inválido. Verifique suas credenciais.");
      } else {
        alert("Ocorreu um erro ao realizar o login.");
      }
    }
  };

  const handleRememberCredentialsChange = (e) => {
  setRememberCredentials(e.target.checked);
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <C.Container>
     <div className="loginContainer">
      <form onSubmit={handleLogin}>
          <label>Nome de usuário</label>
          <input
          placeholder="Username"
          required
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <label>Senha</label>
          <input
          placeholder="Senha"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
       
          <input
          type="checkbox"
          checked={rememberCredentials}
          onChange={handleRememberCredentialsChange}
          />
          Lembrar credenciais
          <button type="submit">Entrar</button>
        </form>
     </div>
    </C.Container>
  );
};