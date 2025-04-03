import Container from "../../components/Container";
import OrderForm from "../../components/forms/OrderForm";
import { useAuth } from "../../context/AuthContext";

const Home = () => {

    const user = useAuth(null);
    return (
      <>
        <OrderForm></OrderForm>
      </>
     
    )
}

export default Home;