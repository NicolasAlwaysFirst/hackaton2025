import React from 'react';
import { Link } from 'react-router';

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 bg-[#AF987A] text-white min-h-screen p-4 shadow-[rgba(0,0,15,0.5)_5px_0px_12px_0px]">
      <h2 className="text-2xl font-bold mb-8">Админ Панель</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/statements" className="block py-2 px-4 rounded-lg hover:bg-gray-700">
              Заявления
            </Link>
          </li>
          <li>
            <Link to="/" className="block py-2 px-4 rounded-lg hover:bg-gray-700">
              Вернуться на главную
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
