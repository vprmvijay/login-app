import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from '../src/actions/login/login'

function App() {
  return (
    <div className="wrapper">
      
      <BrowserRouter>
        <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;