// src/components/EmployeeList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);     // employees data state
  const [loading, setLoading] = useState(true);       // loader state
  const [error, setError] = useState(null);           // error state

  // Fetch employees on component load
  useEffect(() => {
    (
      async () => {
      try {
        const res = await EmployeeService.getAllEmployees();
        setEmployees(res.data);
      } catch (err) {
        // handle error
        const msg = err?.response?.data?.message || 'Failed to load employees...';
        setError(msg);
      } finally {
        //set loading false in both success and error cases
        setLoading(false);
      }
    })();

  }, []);

  // Delete employee handler
  const onDelete = async (id) => {
      if (!confirm('Are you want to Delete this Employee.?')) 
      return;
     try {
      await EmployeeService.deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || 'Delete failed..');
    }
  };

  // Render loading state
  if (loading) 
    return <div className="text-center py-7">Loading.....</div>;

  // Render main component
  return (
    <div className="card  shadow-sm   bg-body-secondary ">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="m-0">Employees Data</h3>
          <Link to="/add-employee" className="btn btn-primary">Add Employee</Link>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

{/* // Render employees table */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle  ">
            <thead className="table-light fs-5">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Status</th>
                <th style={{width: 160}}>Action</th>
              </tr>
            </thead>
            <tbody className="fs-4">
              {/* // Handle no employees case */}
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-danger">No employees found...</td>
                </tr>
              ) : (
                // Render each employee row
                employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.status}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/update-employee/${emp.id}`} className="btn btn-md btn-outline-primary">
                          Edit
                        </Link>
                        <button className="btn btn-md btn-outline-danger" onClick={() => onDelete(emp.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
