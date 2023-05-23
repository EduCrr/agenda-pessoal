import React, {useState} from "react";
import { Link } from "react-router-dom";
import * as C from "./styles";
import api from "../../api";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { MensagemErro } from "../MensagemErro";
export const ListaPessoa = ({ data }) => {
  const [mostrarErro, setMostrarErro] = useState(false);
  const [erros, setErros] = useState([]);
  let user = useSelector((state) => state.user);
  const handleDelete = async (id) => {
    try {
      let json = await api.deleteUser(id, user.token);
      toast.success(json.message);
      window.location.reload();
    } catch (error) {
      setErros([error.response.data.message]);
      setMostrarErro(true);
      return;
    }
   
  }

  const handleClose = () => {
    setMostrarErro(false);
  };
  
  return (
    <>
     {mostrarErro && <MensagemErro errors={erros} handleClose={handleClose} />}
     <C.Container>
     
     <div className="content">
     <div className="userName">
       <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" alt="nome" />
       <span>{data.pessoa.nome} </span>
     </div>
     <div className="userInfo">
       <h4>CPF</h4>
       <span>{data.pessoa.cpf} </span>
     </div>
     <div className="cidade">
       <h4>Cidade</h4>
       <span>{data.pessoa.endereco.cidade} | {data.pessoa.endereco.estado} </span>
     </div>
     <div className="btns">
       <h4>Ações</h4>
       <div className="btn">
       <Link className="edit" to={`/pessoa-editar/${data.pessoa.id}`}>
           Editar
       </Link>
         <button onClick={() => handleDelete(data.pessoa.id)}  className="delete">Excluir</button>
       </div>
     </div>
     </div>
   </C.Container>
    </>
  
  );
};
