// src/components/AddEmployee.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

export default function AddEmployee() {
  // navigation hook
  const navigate = useNavigate();

  // form state and set initial values
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    department: '', designation: '', salary: '',
    dateOfJoining: '', status: 'Active'
  });
  // error state
  const [error, setError] = useState(null);

  // handle form field changes
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // handle form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await EmployeeService.createEmployee({
        ...form,
        salary: Number(form.salary || 0)
      });
      navigate('/employees');
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed');
    }
  };

  // render form inside a card
  return (
    <div className="card shadow-sm bg-body-tertiary ">
      <div className="card-body">
        <h3 className="mb-4">Add New Employee</h3>

        {error && <div className="alert alert-danger">{error}</div>}

{/* // render form */}
        <form onSubmit={onSubmit} className="row g-4">
          <div className="col-md-6">
            <label className="form-label fs-4">First Name</label>
            <input className="form-control fs-4" name="firstName" value={form.firstName} onChange={onChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Last Name</label>
            <input className="form-control fs-4" name="lastName" value={form.lastName} onChange={onChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Email</label>
            <input type="email" className="form-control fs-4" name="email" value={form.email} onChange={onChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Phone</label>
            <input className="form-control fs-4" name="phone" value={form.phone} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Department</label>
            <input className="form-control fs-4" name="department" value={form.department} onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Designation</label>
            <input className="form-control fs-4" name="designation" value={form.designation} onChange={onChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label fs-4">Salary</label>
            <input type="number" className="form-control fs-4" name="salary" value={form.salary} onChange={onChange} />
          </div>
          <div className="col-md-4">
            <label className="form-label fs-4">Date of Joining</label>
            <input type="date" className="form-control fs-4" name="dateOfJoining" value={form.dateOfJoining} onChange={onChange} />
          </div>
          {/* // Status dropdown */}
          <div className="col-md-4">
            <label className="form-label fs-4">Status</label>
            <select className="form-select fs-4" name="status" value={form.status} onChange={onChange}>
              <option>Active</option>
              <option>Resigned</option>
              <option>On Leave</option>
            </select>
          </div>
{/* 
          // submit and cancel buttons */}

          <div className="d-flex gap-3 mt-4 ">
            <button type="submit" className="btn btn-primary btn-lg text-lg-center">Save</button>
            <Link to="/employees" className="btn btn-secondary btn-lg text-lg-center">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
