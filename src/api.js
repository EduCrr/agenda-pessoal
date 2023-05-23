import axios from "axios";

const api = axios.create({
  baseURL: "https://demometaway.vps-kinghost.net:8485/api",
});

const apiCep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loginUser: async (password, username) => {
    let { data: json } = await api.post(`/auth/login`, {
      password,
      username,
    });
    return json;
  },

  getUsersSearch: async (query, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.post(`/contato/pesquisar`, {
      termo: query,
    });
    return json;
  },

  getSingleUser: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.get(`/contato/listar/${id}`);
    return json;
  },

  getUser: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.get(`/usuario/buscar/${id}`);
    return json;
  },

  deleteUser: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.delete(`/pessoa/remover/${id}`);
    return json;
  },

  updatePessoa: async (pessoaData, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  
    const { data: json } = await api.post(`/pessoa/salvar`, pessoaData);
  
    return json;
  },

  updateUser: async (data, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  
    const { data: json } = await api.put(`/usuario/atualizar`, data);
  
    return json;
  },

  getCep: async (cep) => {
    let { data: json } = await apiCep.get(`${cep}/json/`);
    return json;
  },

  updatePhotoPessoa: async (id, foto, token) => {
    let body = new FormData();
  
    if (foto) {
      body.append("foto", foto);
    }
  
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.post(`/foto/upload/${id}`, body);
    return json;
  },

  getUsuarioSearch: async (query, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.post(`/usuario/pesquisar`, {
      termo: query,
    });
    return json;
  },

  createUsuario: async (pessoaData, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.post(`/usuario/salvar`, pessoaData);
    return json;
  },

  updatePassword: async (newPassword, password, username, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.post(`/usuario/alterarSenha`, 
    {
      newPassword, 
      password, 
      username,
    });
    return json;
  },

  editUsuario: async (pessoaData, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    const { data: json } = await api.put(`/usuario/atualizar`, pessoaData);
    return json;
  },

  getPhoto: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.get(`/foto/download/${id}`);
    return json;
  },


};
