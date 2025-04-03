
import { Outlet} from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Container from '../components/Container';
const MainLayout = () => {

  return (
    <>
      <Header></Header>
      <main style={{
        minHeight:'calc(100vh - 115px)'
      }}>

        <Container>
        <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
