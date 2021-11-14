import { baseUrl } from "../../constants";
import axios from "../axios";

export default class LearningPathAction {
    static getAllGames() {
        return axios({
            url: `${baseUrl}/admin/listgames`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    static getLearningPathByGrade(grade) {
        return axios({
            url: `${baseUrl}/user/leveldetails/${grade}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
    }


}
