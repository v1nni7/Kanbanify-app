import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./assets/scss/reset.scss";
import "./assets/scss/styles.scss";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/Private/PrivateRoute";
import AuthContextProvider from "./hooks/context/AuthContext";
import BoardContextProvider from "./hooks/context/BoardContext";
import { Home, Workspace, SignIn, SignUp, Board, Test } from "./pages";
import GlobalStyles from "./assets/styles/Global";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <AuthContextProvider>
        <BrowserRouter>
          {/* <Navbar /> */}
          <BoardContextProvider>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/workspace"
                element={
                  <PrivateRoute>
                    <Workspace />
                  </PrivateRoute>
                }
              />
              <Route
                path="/board/:boardId"
                element={
                  <PrivateRoute>
                    <Board />
                  </PrivateRoute>
                }
              />
              <Route path="/testes" element={<Test />} />
            </Routes>
          </BoardContextProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
};

export default App;
