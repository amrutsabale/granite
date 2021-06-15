import axios from "axios";

const list = () => axios.get("/users");

const usersApi = { list };

export default usersApi;
