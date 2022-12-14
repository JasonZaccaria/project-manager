import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './homepage/Home';
import CalendarTest from './calendar/CalendarTest';
import GetProject from './getproject/GetProject';
import Login from './login/Login';
import Navbar from './navbar/Navbar';
import Register from './register/Register';
import ViewProject from './viewproject/ViewProject';
import ProtectLoginRegister from './protectedRoutes/ProtectLoginRegister';
import ProtectProjects from './protectedRoutes/ProtectProjects';
import ProjectCreate from './projectCreate/ProjectCreate';

function App() {
  return (
    <div className="App" id="App-id">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<ProtectLoginRegister />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectProjects />}>
            <Route path="/getproject" element={<GetProject />} />
            <Route path="/projectcreate" element={<ProjectCreate />} />
            <Route path="/projectpage/" element={<ViewProject />} />
            <Route path="/calendar" element={<CalendarTest />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace={true}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
