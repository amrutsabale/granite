import axios from "axios";

const list = () => axios.get("/tasks");

const create = (payload) => axios.post("/tasks/", payload);

const tasksApi = { list, create };

export default tasksApi;
