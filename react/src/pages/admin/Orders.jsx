import React, { useState, useEffect } from 'react';
import OrderService from '../../api/services/OrderService';
import GroupService from '../../api/services/GroupService';
import Modal from '../../components/modals/Modal';
import { AnimatePresence } from 'framer-motion';
import GroupModalContent from '../../components/modals/GroupModalContent';
import TableSkeleton from '../../components/skeletons/TableSkeleton'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await OrderService.get();
        setOrders(data);
      } catch (err) {
        setError('Ошибка загрузки заявок');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const data = await GroupService.get();
        setGroups(data);
      } catch (err) {
        console.log('Ошибка загрузки групп');
      }
    }
    fetchGroups();
  }, []);


  const openModal = (order) => {
    setSelectedOrder(order);
    setEmail('');
    setModalOpen(true);
  };

  const handleConvert = async (e) => {
    e.preventDefault();
    try {
      // Вызов API для конвертации заявки в студента
      await OrderService.convertOrder(selectedOrder.id, { email, group_id: selectedGroup.id });
      alert('Студент успешно создан');
      setModalOpen(false);
      // Можно убрать заявку из списка или отметить как обработанную:
      setOrders(orders.filter(o => o.id !== selectedOrder.id));
    } catch (err) {
      alert('Ошибка при создании студента');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Заявки от гостей</h1>

      {loading && <TableSkeleton></TableSkeleton> }
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Имя</th>
              <th className="py-2 px-4 border-b">Файл</th>
              <th className="py-2 px-4 border-b">Курс</th>
              <th className="py-2 px-4 border-b">Действия</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">{order.name}</td>
                <td className="py-2 px-4 border-b">
                  <a href={order.filepath} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Посмотреть файл
                  </a>
                </td>
                <td className="py-2 px-4 border-b">{order.course?.name || '-'}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => openModal(order)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Создать студента
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <AnimatePresence>
        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <h2 className="text-xl font-bold mb-4">Создание студента из заявки</h2>
            <form onSubmit={handleConvert} className="space-y-4">
              <div>
                <label className="block mb-1">Email студента</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Группа</label>
                <button
                  type="button"
                  onClick={() => setGroupModalOpen(true)}
                  className="w-full p-2 border border-gray-300 rounded text-left"
                >
                  {selectedGroup ? selectedGroup.name : "Выберите группу"}
                </button>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Создать студента
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {groupModalOpen && <Modal><GroupModalContent groups={groups} onSelect={(group) => { setSelectedGroup(group); setGroupModalOpen(false) }} onClose={() => { setGroupModalOpen(false) }}></GroupModalContent></Modal>}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
