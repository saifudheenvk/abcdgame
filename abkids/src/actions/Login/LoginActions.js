import { baseUrl } from "../../constants";
import axios from "../axios";

export default class ApiCalls {
  static authenticateUser(payload) {
    return axios({
      url: `${baseUrl}/user/login`,
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static createNewUser(payload) {
    return axios({
      url: `${baseUrl}/user/adduser`,
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
