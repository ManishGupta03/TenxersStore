import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Admin from './adminHomePage/Admin';
// import CustomerCard from './customerHomePage/CustomerCard';
import LoginSignup from './Login/Signup/LoginSignup';
import ProductCard from './adminHomePage/ProductCard';
// import Admin from './adminHomePage/Admin';
import CardDetail from './adminHomePage/CardDetail';
import CustomerProduct from './customerHomePage/CustomerProduct';
import CustomerCardDetail from './customerHomePage/CustomerCardDetail'
import NormalCustomer from './normalCoustomer/NormalCustomer';


function App() {
 

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<NormalCustomer/>} />
      <Route path="/login" element={<LoginSignup/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/product" element={<ProductCard/>} />
        <Route path="/customer" element={<CustomerProduct/>} />
        <Route path="/card/:id" element={<CardDetail />} />
        <Route path="/customer/:id" element={<CustomerCardDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
