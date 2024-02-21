import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const SellerHome = () => {
  return (
    <div>
        <Header />
        <div id="welcome">
            <h3>Welcome to seller portal, Click <Link to="/seller/store">here</Link> to list products</h3>
        </div>
        <Footer />
    </div>
  )
}

export default SellerHome