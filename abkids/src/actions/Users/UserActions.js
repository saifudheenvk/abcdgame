import { baseUrl } from "../../constants";
import axios from "../axios";

export default class UserActions {
  static getUserDetails() {
    return axios({
      url: `${baseUrl}/user/getuser`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
