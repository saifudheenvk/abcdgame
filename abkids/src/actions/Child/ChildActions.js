import { baseUrl } from "../../constants";
import axios from "../axios";

export default class ChildActions {


  static getChildren() {
    return axios({
      url: `${baseUrl}/parent/getchildren`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static addChild(data) {
    return axios({
      url: `${baseUrl}/parent/addchild`,
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static getChildrenById(childId) {
    return axios({
      url: `${baseUrl}/child/${childId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

}
