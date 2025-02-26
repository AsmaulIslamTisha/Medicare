import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MedicineList from './MedicineList';  
import MedicineDescription from './MedicineDescription';  
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <h1 className="app-title">Medicine List</h1>
        <Routes>
          <Route path="/" element={<MedicineList />} />
          <Route path="/medicine/:id" element={<MedicineDescription />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
