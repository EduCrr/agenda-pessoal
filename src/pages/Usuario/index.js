import React, { useState, useEffect } from "react";
import api from "../../api";
// import { Slide } from "../../components/Slide";
import * as C from "./styles";
import { useSelector } from "react-redux";
import { ListaUsuario } from "../../components/ListaUsuario";
import { Header } from "../../components/Header";
import { Link } from "react-router-dom";

export const Usuario = () => {
  const [users, setUsers] = useState([]);
  let user = useSelector((state) => state.user);
  const [query, setQuery] = useState('');

  const getUsers = async () => {
    try {
      let json = await api.getUsuarioSearch(query, user.token);
      setUsers(json);
    } catch (error) {
      alert(error.response.data.message);
      return;
    }

  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
    <Header/>
    <C.Container>
      <div className="initial">
        <h1>Usuários</h1>
        <Link className="addUser" to={`/adicionar/usuario/`}>Adicionar usuário</Link>
      </div>
      {users.map((item, k)=>(
        <ListaUsuario data={item} key={k}/>
      ))}
    </C.Container>
    </>
  );
};


//https://dribbble.com/shots/21116149-Stratis-UI-User-list