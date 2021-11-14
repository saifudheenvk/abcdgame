import { baseUrl } from "../../constants";
import axios from "../axios";

export default class LearningPathAction {
  static addLearningPath(data) {
    return axios({
      url: `${baseUrl}/admin/addlearningpath`,
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static updateLearningPath(id, data) {
    return axios({
      url: `${baseUrl}/admin/updatelearningpath/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static viewLearningPathData(grade) {
    console.log("GRAAA",grade)
    return axios({
      url: `${baseUrl}/admin/leveldetails/${grade}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
