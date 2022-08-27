import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './components/Home';
import CalendarTest from './components/CalendarTest';
import GetProject from './components/GetProject';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import ViewProject from './components/ViewProject';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getproject" element={<GetProject />} />
          <Route path="/projectcreate" element={<Home />} />
          <Route path="/projectpage" element={<Home />} />
          <Route path="/projectpage/:id" element={<ViewProject />} />
          <Route path="/calendar" element={<CalendarTest />} />
          <Route path="*" element={<Navigate to="/" replace={true}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
