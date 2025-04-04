import apiClient from "../apiClient";

class StatementService {
  static async get() {
    return await apiClient("/statements", { method: "GET" });
  }

  static async create(files) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files[]", file); // Laravel ждёт "files[]"
    });

    return await fetch("http://localhost:8000/api/statements", {
      method: "POST",
      body: formData,
      headers: {
        // Не ставим Content-Type, browser сам подставит boundary
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при получении PDF");
      }
      return response.blob(); // ← ожидаем PDF, а не JSON
    });
  }
}

export default StatementService;