import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // или ваш контекст авторизации
import { Navigate, useNavigate } from "react-router";
import AuthService from "../../api/services/AuthService";
import FullLoader from "../../components/FullLoader";
import './Profile.css'
const Profile = () => {
  const { user, loading } = useAuth(); // из контекста получаем информацию о пользователе и функцию для обновления пароля
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Обработчик обновления пароля
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Новый пароль и подтверждение пароля не совпадают!");
      return;
    }

    try {
      const data = await AuthService.updatePassword(oldPassword, newPassword);
      if (data.status) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Ошибка при обновлении пароля: " + error.message);
    }
  };

  return (
    <div className=" mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Мой профиль</h2>
      {loading && <FullLoader />}
      {!loading && !user && <Navigate to="/" />}
      {user && <>
        {/* <div className="bg-white p-6 shadow-md rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Роль:</strong> {user.role}</p>
          <p><strong>Адрес:</strong> {user.adress}</p>
          <h2>Документы</h2>
          <p><strong>Паспорт:</strong> {user.password}</p>
          <p><strong>Снилс:</strong> {user.snils}</p>
          <h2>Заявления:</h2> */}
        {/* тут список файлов */}
        {/* </div>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Изменить пароль</h3>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-gray-700">Старый пароль</label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-gray-700">Новый пароль</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">Подтверждение пароля</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full">Обновить пароль</button>
          </form>
        </div> */}




        <div>
          <div className="main">
            <div className="sidebar">
              <img
                src="https://www.w3schools.com/howto/img_avatar2.png"
                className="avatar"
                alt="avatar"
              />
              <div className="nav">
                <a href="#" className="active">
                  👤 Основные данные
                </a>
                <a href="#">📄 Заявления</a>
              </div>
            </div>

            <div className="content">
              <h2>Шевченко Игнат Васильевич</h2>
              <div className="status">✔ Принято</div>

              <div className="info-block">
                <label>E-mail:</label>
                <input type="text" value="0dyanshik@gmail.com" disabled />
                <br />
                <label>Мобильный:</label>
                <input type="text" value="9638122007" disabled />
                <br />
                <label>Адрес:</label>
                <input type="text" value="Шахты г" disabled />
              </div>

              <div className="section document">
                <h3>Документы</h3>
                <p>
                  <strong>Паспорт:</strong> Паспорт РФ: 600* ***50 от 01.11.2002{' '}
                  <span>✔ Загружена скан копия</span>
                </p>
                <p>
                  <strong>Аттестат/Диплом:</strong> Аттестат о среднем общем образовании:
                  545454 от 01.11.2002 <span>✔ Загружена скан копия</span>
                </p>
              </div>

              <div className="section statements">
                <h3>Поданные заявления:</h3>
                <p>
                  <a href="#">08.03.01</a> Меня обманули
                </p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="block text-gray-700">Старый пароль</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700">Новый пароль</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Подтверждение пароля</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg w-full">Обновить пароль</button>
        </form>
      </>}

    </div>
  );
};

export default Profile;
