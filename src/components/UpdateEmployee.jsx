// src/components/UpdateEmployee.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

export default function UpdateEmployee() {
  // get id from url params
  const { id } = useParams();
  // navigation hook
  const navigate = useNavigate();
  // form state
  const [form, setForm] = useState(null);
  // error state
  const [error, setError] = useState(null);

  // fetch employee data on component load
  useEffect(() => {
    (async () => {
      try {
        //fetch employee by id
        const res = await EmployeeService.getEmployeeById(id);
        //set form data
        setForm(res.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load employee..");
      }
    })();
  }, [id]);

  // handle form field changes
   function onChange(e) {
    //apply changes to form state
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  } 

  // handle form submit
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await EmployeeService.updateEmployee(id, {
        ...form,
        salary: Number(form.salary || 0),
      });
      navigate("/employees");
    } catch (err) {
      setError(err?.response?.data?.message || "Update failed..");
    }
  };

  if (!form) return <div>Loading...</div>;
// make card and render form
  return (
    <div className="card  shadow-md bg-body-tertiary">
      <div className="card-body">
        <h3 className="mb-3">Update Employee</h3>

        {error && <div className="alert alert-danger">{error}</div>}
                {/* //handle form submit */}
        <form onSubmit={onSubmit} className="row g-4">
          <div className="col-md-6">
            <label className="form-label fs-4">First Name</label>
            <input
              className="form-control fs-4"
              name="firstName"
              value={form.firstName || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Last Name</label>
            <input
              className="form-control fs-4"
              name="lastName"
              value={form.lastName || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Email</label>
            <input
              type="email"
              className="form-control fs-4"
              name="email"
              value={form.email || ""}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Phone</label>
            <input
              className="form-control fs-4"
              name="phone"
              value={form.phone || ""}
              onChange={onChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Department</label>
            <input
              className="form-control fs-4"
              name="department"
              value={form.department || ""}
              onChange={onChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fs-4">Designation</label>
            <input
              className="form-control fs-4"
              name="designation"
              value={form.designation || ""}
              onChange={onChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fs=4">Salary</label>
            <input
              type="number"
              className="form-control fs-4"
              name="salary"
              value={form.salary || ""}
              onChange={onChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fs-4">Date of Joining</label>
            <input
              type="date"
              className="form-control fs-4"
              name="dateOfJoining"
              value={form.dateOfJoining || ""}
              onChange={onChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fs-4">Status</label>
            <select
              className="form-select fs-4"
              name="status"
              value={form.status || "Active"}
              onChange={onChange}
            >
              <option>Active</option>
              <option>Resigned</option>
              <option>On Leave</option>
            </select>
          </div>
         {/* // submit and cancel buttons */}
          <div className="container mt-3">
            <div className="mx-auto">
              <div className="d-flex justify-content-center gap-3">
                <button type="submit" className="btn btn-primary fs-4">
                  Update
                </button>
                <Link to="/employees" className="btn btn-secondary fs-4">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
