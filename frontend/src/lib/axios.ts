import axios from "axios";
export const api = axios.create({
  baseURL: "https://k-j-express.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
