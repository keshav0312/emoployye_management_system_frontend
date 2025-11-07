export const baseURL = import.meta.env.VITE_BASE_URL;


export const apiEndpoints = {
  getAllEmployees : `${baseURL}/employee`,
  getEmployeeById: (id) => `${baseURL}/employee/${id}`,
  addEmployee: `${baseURL}/employee`,
  updateEmployee: (id) => `${baseURL}/employee/${id}`,
  deleteEmployee: (id) => `${baseURL}/employee/${id}`,
};