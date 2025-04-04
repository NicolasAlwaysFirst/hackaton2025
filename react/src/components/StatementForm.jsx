import React, { useState } from "react";
import StatementService from "../api/services/StatementService";
import FullLoader from "./FullLoader";

const StatementForm = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // Преобразуем FileList в массив
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blob = await StatementService.create(files); // ← получаем PDF как Blob

      // Скачиваем PDF
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "result.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert("PDF успешно сформирован и загружен.");
    } catch (error) {
      alert("Ошибка при отправке заявки: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="opacity-50">
          <FullLoader />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="py-4">
          <h2 className="text-2xl font-bold">Добавить заявление</h2>

          <div className="mt-4">
            <label className="block text-gray-600">Файлы (можно выбрать несколько):</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              multiple
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              aria-invalid={files.length === 0 ? "true" : "false"}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded-lg w-full"
          >
            Отправить заявления на обработку
          </button>
        </div>
      </form>
    </>
  );
};

export default StatementForm;
