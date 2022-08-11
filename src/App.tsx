import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./assets/scss/reset.scss";
import "./assets/scss/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home";
import Login from "./pages/login";
import Test from "./pages/test";
import Board from "./pages/board";
import Boards from "./pages/boards";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/board/:idBoard" element={<Board />} />
        <Route path="/testes" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
