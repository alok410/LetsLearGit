import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:8081/employees')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const employeeCode = window.localStorage.getItem('empCode');
        const employee = data.find(emp => emp.empCode === parseInt(employeeCode));
        if (employee) {
          setUserRole(employee.useRoleId);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/leave-request-form" className={location.pathname === '/leave-request-form' ? 'active' : ''}>Leave Request Form</Link>
        </li>
        <li>
          <Link to="/leave-request-list" className={location.pathname === '/leave-request-list' ? 'active' : ''}>My Leave Requests List</Link>
        </li>
        {userRole === 1 || userRole === 4 ? (
          <li>
            <Link to="/manager-leave-request" className={location.pathname === '/manager-leave-request' ? 'active' : ''}>Faculties Requests List</Link>
          </li>
        ) : null}
        {userRole === 4 ? (
          <li>
            <Link to="/PrincipalLeaveRequestList" className={location.pathname === '/PrincipalLeaveRequestList' ? 'active' : ''}>All Faculties Requests List</Link>
          </li>
        ) : null}
      </ul>
      <ul className='Loginbtn'>
      <li>
  {localStorage.length === 0 ? (
    <Link to="/Login">Login</Link>
  ) : (
    <Link to="/Login  ">Logout</Link>
  )}
</li>

      </ul>
    </nav>
  );
}

export default Navbar;
