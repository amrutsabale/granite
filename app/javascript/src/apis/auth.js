import axios from "axios";

const login = (payload) => axios.post("/sessions", payload);

const signup = (payload) => axios.post("/users", payload);

const authApi = {
  login,
  signup,
};

export default authApi;
