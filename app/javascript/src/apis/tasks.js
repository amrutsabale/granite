import axios from "axios";

const list = () => axios.get("/tasks");

const tasksApi = { list };

export default tasksApi;
