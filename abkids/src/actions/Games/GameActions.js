import { baseUrl } from "../../constants";
import axios from "../axios";

export default class GameActions {
  static getAllGames() {
    return axios({
      url: `${baseUrl}/admin/listgames`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static getgameData(gameId) {
    return axios({
      url: `${baseUrl}/admin/listgamedata/${gameId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static getSingleGame(gameId) {
    return axios({
      url: `${baseUrl}/admin/game/${gameId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static addGameData(data) {
    const formdata = new FormData();
    formdata.append("level", data.level);
    formdata.append("gameId", data.gameId);
    if (data.gameValues.image) {
      formdata.append("image", data.gameValues.image);
    }
    delete data.gameValues.image;
    formdata.append("gameValues", JSON.stringify(data.gameValues));
    return axios({
      url: `${baseUrl}/admin/addGameData`,
      data: formdata,
      method: "POST",
    });
  }

  static getGameDataById(gameDataId) {
    return axios({
      url: `${baseUrl}/games/gamedatabydataid/${gameDataId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
