import axios from "axios";

const login = (payload) => axios.post("/sessions", payload);
const logout = () => axios.delete(`/sessions`);
const signup = (payload) => axios.post("/users", payload);

const authApi = {
  login,
  signup,
  logout,
};

export default authApi;
