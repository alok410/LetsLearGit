import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LeaveRequestForm from './Components/LeaveRequestForm';
import MyLeaveRequestsList from './Components/MyLeaveRequestsList';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import ManagerLeaveRequestsList from './Components/ManagerLeaveRequestsList';
import { EmpPendingReq } from './Components/EmpPendingReq';
import { PrincipalLeaveRequestList } from './Components/PrincipalLeaveRequestList';
import { AllEmpPendingReq } from './Components/AllEmpPendingReq';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true'); // Set loggedIn in localStorage
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  return (
    <Router>
      <div>
        <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          {loggedIn ? (
            <>
              <Route path="/leave-request-form" element={<LeaveRequestForm />} />
              <Route path="/leave-request-list" element={<MyLeaveRequestsList />} />
              <Route path="/manager-leave-request" element={<ManagerLeaveRequestsList />} />
              <Route path="/EmpPendingReq" element={<EmpPendingReq />} />
              <Route path="/PrincipalLeaveRequestList" element={<PrincipalLeaveRequestList />} />
              <Route path="/AllEmpPendingReq" element={<AllEmpPendingReq />} />
              



            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>
    </Router> 
  );
}

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/empreq')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <h2>Gperi GTU</h2>
      {/* <table>
        <thead>
          <tr>
            <th>empName</th>
            <th>empCode</th>
            <th>startdate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.EmpName}</td>
              <td>{d.EmpCode}</td>
              <td>{d.StartDate}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default App;
