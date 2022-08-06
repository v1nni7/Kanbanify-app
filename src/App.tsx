import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './assets/scss/reset.scss';
import './assets/scss/styles.scss';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home';
import Login from './pages/login';
import Test from './pages/test';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/testes" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;