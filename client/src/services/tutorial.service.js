import http from "../http-common";
class PlayersDataService {
  getAll() {
    return http.get("/players");
  }
  get(id) {
    return http.get(`/players/${id}`);
  }
  create(data) {
    return http.post("/players", data);
  }
  update(id, data) {
    return http.put(`/players/${id}`, data);
  }
  delete(id) {
    return http.delete(`players//${id}`);
  }
  deleteAll() {
    return http.delete(`/players`);
  }
  findByTitle(first) {
    return http.get(`/players?first=${first}`);
  }
}
export default new PlayersDataService();