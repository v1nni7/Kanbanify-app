import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './assets/scss/reset.scss';
import './assets/scss/styles.scss';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;