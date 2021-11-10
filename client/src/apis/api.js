import axios from "axios";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default axios.create({
  baseURL: "https://localhost:5000/api",
  headers: {
    Accept: "applications/json",
    
  },
});
