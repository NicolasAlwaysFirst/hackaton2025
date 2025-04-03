import React, { useState, useEffect } from "react";
import StatementService from "../api/services/StatementService";
import FullLoader from "./FullLoader"
const StatementForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Формируем FormData для отправки файла и остальных данных
    const formData = new FormData();
    try {
      // OrderService.createOrder должен отправлять FormData на endpoint StatementController::store
      const response = await StatementService.create({file: file});
      alert("Заявка успешно отправлена");
    } catch (error) {
      alert("Ошибка при отправке заявки: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading && <div className={'opacity-50'}><FullLoader></FullLoader></div>} 
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="py-4">
        <h2 className="text-2xl font-bold">Добавить заявление</h2>
    
        <div className="mt-4">
          <label className="block text-gray-600">Файл:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
            aria-invalid={file === null ? "true" : "false"}
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          Отправить заявление на обработку
        </button>
      </div>
    </form>
    </>
  );
};

export default StatementForm;
