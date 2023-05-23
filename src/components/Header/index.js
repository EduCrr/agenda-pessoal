import React from "react";
 import { Link, useNavigate } from "react-router-dom";
 import * as C from "./styles";
 import { useDispatch } from "react-redux";
 import { setLogOut } from "../../redux/reducers/userReducer";
 import { useSelector } from "react-redux";
 import { ImHome } from "react-icons/im";
 import api from "../../api";
 import { NavLink } from 'react-router-dom';

export const Header = () => {
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setLogOut());
    navigate("/login");
  }

  return (
    <C.Container>
      <div className="menuLeft">
        <ImHome/>
      </div>
      <div className="menuRight">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to={`/meu-cadastro/${user.id}`} activeClassName="active">
          Meu cadastro
        </NavLink>
        <NavLink to={`/usuarios`} activeClassName="active">
          Usuários
        </NavLink>
        <p onClick={handleLogout}>Sair</p>
      </div>
    </C.Container>
  );
};
