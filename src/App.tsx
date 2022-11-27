import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/Private/PrivateRoute";
import AuthContextProvider from "./hooks/context/AuthContext";
import { Home, Workspace, SignIn, SignUp, Board, Test } from "./pages";
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
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

export default App;
