import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';
import Sidebar from '../components/Sidebar';
import FullLoader from '../components/FullLoader';
const AdminLayout = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <>
        <FullLoader />
      </>
    );
  }
  if ((!user || user.role !== "admin")) {
    return <Navigate to="/" />;
  }


  return (
    <>
      <Header></Header>
      <main>

        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-8">
            <Outlet />
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
};

export default AdminLayout;