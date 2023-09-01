import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Pizza from './pages/Pizza';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Sideorders from './pages/Sideorders';
import MenuManagementPage from './pages/MenuManagementPage';
import Beverages from './pages/Beverages';
import Cart from './pages/Cart';
const App = () => {
    return (
        <Router>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/menu/" element={<Menu />} />
            <Route path="/menu/pizza" element={<Pizza/>} />
        <Route path="/menu/sides" element={<Sideorders/>} />
        <Route path="/menu/beverages" element={<Beverages/>} />
        <Route path="/home/management" element={<MenuManagementPage/>}/>
        <Route path="/cart" element={<Cart/>}/>

            </Routes>
        </Router>
    );
}

export default App;
