import axios from "axios";

const list = () => axios.get("/tasks");

const show = (slug) => axios.get(`/tasks/${slug}`);

const create = (payload) => axios.post("/tasks/", payload);

const tasksApi = { list, create, show };

export default tasksApi;
