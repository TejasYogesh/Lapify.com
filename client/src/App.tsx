import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import PaymentSuccess from './Pages/PaymentSuccess';
import Chatbot from './Pages/Chatbot';
import Login from './Pages/Login';
import ListOf from './Pages/ListOf';
import BuyNow from './Pages/BuyNow';
import Contact from './Pages/Contact';
import Otp from './Pages/Otp';
import Summary from './Pages/Summary';
import Terms from './Pages/Terms';
function App() {
  return (

    <Routes>
      {/* Home Page */}
      <Route path="/home" element={<Home />} />

      {/* Other Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Login />} />
      <Route path="/listof" element={<ListOf />} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/summary" element={<Summary />}></Route>
      <Route path="/otpverify" element={<Otp />}></Route>
      <Route path="/buynow/:id" element={<BuyNow />} />
      <Route path='/terms' element={<Terms />}></Route>
      <Route path='/otp' element={<Otp />}></Route>
    </Routes>

  );
}

export default App;