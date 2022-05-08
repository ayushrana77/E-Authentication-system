import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Logout from "./components/Logout/Logout";
import Otp from "./components/Otp/otp";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="register/otp" element={<Otp />} />
      </Routes>
    </div>
  );
}

export default App;
