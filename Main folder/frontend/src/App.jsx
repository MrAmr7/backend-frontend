import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import CreatePost from './component/CreatePost';
import About from './pages/About';
import Server from './pages/Server';
import Payment from './pages/Payment';
import Edit from "./component/Edit"
import Dashbord from "./component/Dashbord"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Server />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/dashbord" element={<Dashbord />} />
      </Routes>
    </Router>
  );
};

export default App;
