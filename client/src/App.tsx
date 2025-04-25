import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import PaymentSuccess from './Pages/PaymentSuccess';
import Chatbot from './Pages/Chatbot';
import Login from './Pages/Login';
import ListOf from './Pages/ListOf';
import BuyNow from './Pages/BuyNow';
function App() {
  return (
   
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Other Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listof" element={<ListOf />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/buynow/:id" element={<BuyNow />} />
      </Routes>
    
  );
}

export default App;