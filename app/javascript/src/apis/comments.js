import axios from "axios";

const create = (payload) => axios.post("/comments/", payload);

const commentsApi = { create };

export default commentsApi;
