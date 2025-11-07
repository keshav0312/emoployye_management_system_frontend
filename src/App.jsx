// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid py-4 px-5 ">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
