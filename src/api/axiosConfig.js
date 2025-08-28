import axios from "axios";

const API_URL = "https://todo-web-application-backend-j0kb.onrender.com/";

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
