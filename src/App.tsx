import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/Private/PrivateRoute";
import AuthContextProvider from "./hooks/context/AuthContext";
import { Home, Workspace, SignIn, SignUp, Board } from "./pages";
import GlobalStyles from "./assets/styles/Global";
import ToastPopUp from "./components/ToastPopUp";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ToastPopUp />
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/workspace"
              element={
                <PrivateRoute>
                  <>
                    <Navbar />
                    <Workspace />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/board/:boardId"
              element={
                <PrivateRoute>
                  <>
                    <Navbar />
                    <Board />
                  </>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

export default App;
