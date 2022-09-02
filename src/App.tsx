import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import "./assets/scss/reset.scss";
import "./assets/scss/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home";
import Login from "./pages/login";
import Test from "./pages/test";
import Workspace from "./pages/workspace";
import Boards from "./pages/boards";
import Navbar from "./components/Navbar/Navbar";
import BoardContextProvider from "./hooks/context/BoardContext";

const App = () => {

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <BoardContextProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boards" element={<Boards />} />
          <Route path="/workspace/:idWorkspace" element={<Workspace />} />
          <Route path="/testes" element={<Test />} />
        </Routes>
      </BoardContextProvider>
    </BrowserRouter>
  );
};

export default App;
