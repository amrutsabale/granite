import axios from "axios";

const list = () => axios.get("/tasks");

const show = (slug) => axios.get(`/tasks/${slug}`);

const create = (payload) => axios.post("/tasks/", payload);

const update = ({ slug, payload }) => axios.put(`/tasks/${slug}`, payload);

const tasksApi = { list, create, show, update };

export default tasksApi;
