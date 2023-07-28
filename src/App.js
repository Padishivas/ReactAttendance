import logo from './logo.svg';
import {Grid} from "@mui/material"
import './App.css';
import FirstPage from './components/firstPage';
import LoginForm from "./components/login" ;
import RegisterForm from './components/register';
import Home from './components/home';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './components/protected';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<ProtectedRoutes />}>
                <Route path="home" element={<Home />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
