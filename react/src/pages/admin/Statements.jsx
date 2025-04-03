import React, { useState, useEffect } from "react";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import { Link } from "react-router";
import StatementService from "../../api/services/StatementService";

const Statements = () => {
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStatements() {
      try {
        const data = await StatementService.get();
        setStatements(data);
      } catch (err) {
        setError("Ошибка загрузки заявлений");
      } finally {
        setLoading(false);
      }
    }
    fetchStatements();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Заявления</h1>
      <Link to="/statements/create">
        <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Добавить новое заявление
        </button>
      </Link>

      {loading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, idx) => (
            <TableSkeleton key={idx} />
          ))}
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && statements.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ФИО</th>
              <th className="py-2 px-4 border-b">ИНН</th>
              <th className="py-2 px-4 border-b">Дата</th>
              <th className="py-2 px-4 border-b">Сумма</th>
              <th className="py-2 px-4 border-b">Фирма</th>
              <th className="py-2 px-4 border-b">Файл</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement) => (
              <tr key={statement.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{statement.name}</td>
                <td className="py-2 px-4 border-b">{statement.inn || "-"}</td>
                <td className="py-2 px-4 border-b">{statement.date || "-"}</td>
                <td className="py-2 px-4 border-b">{statement.summ || "-"}</td>
                <td className="py-2 px-4 border-b">{statement.firm || "-"}</td>
                <td className="py-2 px-4 border-b">
                  {statement.filepath ? (
                    <a
                      href={process.env.REACT_APP_STORAGE_URL +'/'+ statement.filepath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Открыть файл
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p className="text-gray-500">Заявлений пока нет.</p>
      )}
    </div>
  );
};

export default Statements;
