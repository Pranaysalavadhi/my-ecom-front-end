import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
  // baseURL: "http://ec2-3-85-81-74.compute-1.amazonaws.com:8080/api",
});
delete API.defaults.headers.common["Authorization"];
export default API;
