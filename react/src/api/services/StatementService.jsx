import apiClient from "../apiClient";

class StatementService {
    static async get() {
        return await apiClient("/statements", { method: "GET" });
    }
    static async create(data) {
      const formData = new FormData();
      formData.append("file", data.file); // Загружаем файл
  
      return await apiClient("/statements", {
        method: "POST",
        body: formData,
      });
    }
}

export default StatementService;
