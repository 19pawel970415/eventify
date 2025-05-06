import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

import Register from './pages/Register';
import Login from './pages/Login';
import EventsList from './pages/EventsList';
import MyEvents from './pages/MyEvents';
import BoughtEvents from './pages/BoughtEvents';
import MyTickets from './pages/MyTickets';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/EventsList" element={<EventsList />} />
        <Route path="/MyEvents" element={<MyEvents />} />
        <Route path="/BoughtEvents" element={<BoughtEvents />} />
        <Route path="/MyTickets" element={<MyTickets />} />
      </Routes>
    </Router>
  );
}

export default App;