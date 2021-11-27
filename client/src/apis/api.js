import axios from "axios";
import {getAuthToken} from '../utils/localStorage'

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
if(getAuthToken()){
  axios.defaults.headers.common["token"] = getAuthToken()
} else {
  delete axios.defaults.headers.common["token"];
}
export default axios.create({
  baseURL: "http://localhost:5001/",
  // baseURL: "https://engage-api.vidhiangrish.com/",
  headers: {
    Accept: "applications/json",
    
  },
});
