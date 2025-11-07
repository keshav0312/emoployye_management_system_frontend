// src/services/EmployeeService.js
import axios from 'axios';
import { apiEndpoints } from '../config/api';

const getAllEmployees   = () => axios.get(apiEndpoints.getAllEmployees);
console.log(getAllEmployees);

const getEmployeeById   = (id) => axios.get(apiEndpoints.getEmployeeById(id));
const createEmployee    = (data) => axios.post(apiEndpoints.addEmployee, data);
const updateEmployee    = (id, data) => axios.put(apiEndpoints.updateEmployee(id), data);
const deleteEmployee    = (id) => axios.delete(apiEndpoints.deleteEmployee(id));

export default {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
