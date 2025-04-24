 
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import PaymentSuccess from './Pages/PaymentSuccess';
import LoginPage from './Pages/LoginPage';
import Chatbot from './Pages/Chatbot';
function App() {
 

  return (
    <>
      <div>
        <Chatbot/>
      </div>

    </>
  )
}

export default App
