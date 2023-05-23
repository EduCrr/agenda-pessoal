import React, { useState, useEffect } from "react";
import api from "../../api";
// import { Slide } from "../../components/Slide";
import * as C from "./styles";
import { useSelector } from "react-redux";
import { ListaPessoa } from "../../components/ListaPessoa";
import { Header } from "../../components/Header";
import { toast } from 'react-toastify';

export const Home = () => {
  const [users, setUsers] = useState([]);
  let user = useSelector((state) => state.user);
  const [query, setQuery] = useState('');
  
  const getTeste = async() => {
    let json = await api.getPhoto(2, user.token);
  }

  const getUsers = async () => {
    try {
      let json = await api.getUsersSearch(query, user.token);
      setUsers(json);
    } catch (error) {
      alert(error.response.data.message);
      toast.error(error.response.data.message);
      return;
    }
  };

  useEffect(() => {
    getUsers();
    getTeste();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(query === ''){
      getUsers()
    }else{
      let json = await api.getUsersSearch(query, user.token);
      setUsers(json);
    }
  };

  return (
    <>
    <Header/>
    <C.Container>
      <div className="initial">
        <h1>Pessoas</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      {users.map((item, k)=>(
        <ListaPessoa data={item} key={k}/>
      ))}
    </C.Container>
    </>
  );
};
