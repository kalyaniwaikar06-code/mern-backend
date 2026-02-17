import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-backend-oisx.onrender.com/api",
});

export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
