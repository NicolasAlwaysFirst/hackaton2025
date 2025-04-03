import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import Container from "./Container";
import LocalLoader from "./LocalLoader";

export default function Header() {
  const { user, loading, handleLogout } = useAuth();

  return (

    <header className="z-20 relative shadow-[rgba(199, 149, 75, 0.5)_0px_10px_8px_0px] h-[50px] p-[10px] bg-[#F2EADF]" >
      <Container>
        <nav className="flex gap-[15px] justify-between">
          <div className="flex gap-[15px]"><Link to="/" style={styles.link}>Главная</Link>
            {loading ? <LocalLoader /> :
              (user ? (
                <>
                  <Link to="/profile" style={styles.link}>Профиль</Link>
                  {user.role == "admin" && <Link to="/admin" style={styles.link}>Админка</Link>}

                </>
              ) : (
                <>
                  <Link to="/login" className="rounded-lg" style={styles.link}>Вход</Link>
                  <Link to="/register" className="rounded-lg height: 30px;" style={styles.link}>Регистрация</Link>
                </>
              ))}

            <>

            </>
          </div>
          <div className="right">
            {user && <button onClick={handleLogout} className="rounded px-2 text-white cursor-pointer py-1 bg-[#B8A386]">Выйти</button>}
          </div>
        </nav>
      </Container>
    </header>

  );
}

const styles = {
  link: { color: "#8A3D42", textDecoration: "none", fontSize: "18px" },
};
