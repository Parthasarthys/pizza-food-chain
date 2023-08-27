import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Pizza from './pages/Pizza';
import Sideorders from './pages/Sideorders';
import Beverages from './pages/Beverages';
import CategoryPage from './pages/CategoryPage';
const App = () => {
    return (
        <Router>
          <Routes>
            {/* <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/> */}
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:category" element={<CategoryPage />} />
            <Route path="/menu/beverages" element ={<Beverages/>}/>
            <Route path="/menu/sides" element={<Sideorders/>}/>
            </Routes>
        </Router>
    );
}

export default App;
