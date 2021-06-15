import axios from "axios";

const list = () => axios.get("/tasks");

const show = (slug) => axios.get(`/tasks/${slug}`);

const create = (payload) => axios.post("/tasks/", payload);

const update = ({ slug, payload }) => axios.put(`/tasks/${slug}`, payload);

const destroy = (slug) => axios.delete(`/tasks/${slug}`);

const tasksApi = { list, create, show, update, destroy };

export default tasksApi;
