import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Pizza from './pages/Pizza';
import Sideorders from './pages/Sideorders';
import Beverages from './pages/Beverages';
const App = () => {
    return (
        <Router>
          <Routes>
            {/* <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/> */}
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home />}/>
                <Route path="/home/menu" element={<Menu />}/>
                    <Route path="/home/menu/pizza" element={<Pizza />} />
                    <Route path="/home/menu/sides" element={<Sideorders />} />
                    <Route path="/home/menu/beverages" element={<Beverages />} />
            </Routes>
        </Router>
    );
}

export default App;
