import './App.css';
import { Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/guest/Home";
import Login from "./pages/guest/Login";
import Register from "./pages/guest/Register";
import Dashboard from "./pages/admin/Dashboard";
import Profile from "./pages/user/Profile";
import StatementForm from './components/StatementForm';
import Statements from './pages/admin/Statements';
function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Route>


        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/statements" element={<Statements />} />
          <Route path="/statements/create" element={<StatementForm />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
