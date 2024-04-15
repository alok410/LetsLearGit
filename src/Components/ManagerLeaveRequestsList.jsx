import React, { useEffect, useState } from 'react';
import './ManagerLeaveRequestsList.css';
import Icon_Clock from '../Imgs/Icon_Clock.webp';
import { Link } from 'react-router-dom';
import { EmpPendingReq } from './EmpPendingReq';


function convertUTCtoIST(utcDateTimeString) {
  const utcDateTime = new Date(utcDateTimeString);
  utcDateTime.setHours(utcDateTime.getHours() + 5);
  utcDateTime.setMinutes(utcDateTime.getMinutes() + 30);
  const ISTDateTimeString = utcDateTime.toISOString().replace('T', ' ').replace('Z', '');
  return ISTDateTimeString;
}


function extractDateOnly(dateTimeString) {
  if (dateTimeString === '0000-00-00') {
    return dateTimeString;
  }
  const date = new Date(dateTimeString);
  const isoDate = date.toISOString();
  return isoDate.split('T')[0];
}



const ManagerLeaveRequestsList = () => {

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const loggedInEmpCode = localStorage.getItem('empCode');

  useEffect(() => {
    fetch('http://localhost:8081/empreq')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);


  useEffect(() => {
    fetch('http://localhost:8081/employees')
      .then(res2 => res2.json())
      .then(data2 => setData2(data2))
      .catch(err2 => console.log(err2));
  }, []);

  const filteredEmployees = data2.filter(request => request.managerCode == loggedInEmpCode);
  const filteredData = data.filter(request => filteredEmployees.some(emp => emp.empCode === request.EmpCode));

  const pendingReq = filteredData.filter(request => request.LeaveStatus == 'Approved' || request.LeaveStatus == 'Denied');


  const finaldata =  (loggedInEmpCode === 1005) ? data:filteredData
  return (
    <div className="manager-leave-requests-list-container">
      <div className="heading">
        <h2>Approved and Denied Requests</h2>
        <div className="left">

          <Link to='/EmpPendingReq'>
            <div className='left-Ico'>
              <img className='pending_Icon' src={Icon_Clock} />
              <div className='count'>{filteredData.length - pendingReq.length }</div>
            </div>
          </Link>
        </div>
      </div>
      <table className="manager-leave-requests-table">
        <thead className='table-head'>
          <tr>
            <th>srNo.</th>
            <th>EmpName</th>
            <th>EmpCode</th>
            <th>LeaveType</th>
            <th>LeaveReason</th>
            <th>Status</th>
            <th>StartDate</th>
            <th>EndDate</th>
            <th>CreatedOn</th>
          </tr>
        </thead>  
        <tbody>
          {pendingReq.map((request, i) => (
            <tr key={i} className={request.LeaveStatus === 'Approved' ? 'approved' : 'denied'}>
              <td>{request.new_id}</td>
              <td>{request.EmpName}</td>
              <td>{request.EmpCode}</td>
              <td>{request.LeaveType}</td>
              <td>{request.LeaveReason}</td>
              <td>{request.LeaveStatus}</td>
              <td>{extractDateOnly(request.StartDate)}</td>
              <td>{extractDateOnly(request.EndDate)}</td>
              <td>{convertUTCtoIST(request.CreateOn)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerLeaveRequestsList;
