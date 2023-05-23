import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Pessoa } from "./pages/Pessoa";
import { Usuario } from "./pages/Usuario";
import { EditarUsuario } from "./pages/EditarUsuario";
import { AdicionarUsuario } from "./pages/AdicionarUsuario";
import { Logado } from "./pages/Logado";
import { Login } from "./pages/Login";
import { RequiredAuth } from "./RequiredAuth";

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequiredAuth>
            <Home />
          </RequiredAuth>
        }
      />
      <Route
        path="/pessoa-editar/:id"
        element={
          <RequiredAuth>
            <Pessoa />
          </RequiredAuth>
        }
      />
     <Route
      path="/meu-cadastro/:id"
      element={
        <RequiredAuth>
          <Logado />
        </RequiredAuth>
      }
    />
    <Route
      path="/usuarios/"
      element={
        <RequiredAuth>
          <Usuario />
        </RequiredAuth>
      }
    />
    <Route
      path="/adicionar/usuario/"
      element={
        <RequiredAuth>
          <AdicionarUsuario />
        </RequiredAuth>
      }
    />
    <Route
      path="/editar/usuario/:id"
      element={
        <RequiredAuth>
          <EditarUsuario />
        </RequiredAuth>
      }
    />
    </Routes>
  );
};
