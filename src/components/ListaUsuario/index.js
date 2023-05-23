import React from "react";
import { Link } from "react-router-dom";
import * as C from "../ListaPessoa/styles";
import { useSelector } from "react-redux";

export const ListaUsuario = ({ data }) => {
    let user = useSelector((state) => state.user);

  return (
    <C.Container>
      <div className="content">
        <div className="userInfo">
          <h4>Nome</h4>
          <span>{data.nome} </span>
        </div>
        <div className="cidade">
          <h4>E-mail</h4>
          <span>{data.email}</span>
        </div>
        <div className="cidade">
          <h4>Telefone</h4>
          <span>{data.telefone}</span>
        </div>
        {/* <div className="btns">
          <h4>Ações</h4>
          <div className="btn">
            <Link className="edit" to={`/editar/usuario/${data.id}`}>
              Editar
            </Link>
          </div>
        </div> */}
      </div>
    </C.Container>
  );
};
