import React, { useEffect, useState } from 'react';
import './MyLeaveRequestsList.css'; // Import the CSS file for styling

const LeaveRequestsList = () => {
  const [data, setData] = useState([]);
  const loggedInEmpCode = localStorage.getItem('empCode'); // Retrieve EmpCode from local storage

  useEffect(() => {
    fetch('http://localhost:8081/empreq')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  function convertUTCtoIST(utcDateTimeString) {
    // Parse the UTC date string
    const utcDateTime = new Date(utcDateTimeString);
    // Adjust for IST (UTC+5:30)
    utcDateTime.setHours(utcDateTime.getHours() + 5);
    utcDateTime.setMinutes(utcDateTime.getMinutes() + 30);
    // Format the date as desired (e.g., "YYYY-MM-DD HH:MM AM/PM")
    const ISTDateTimeString = utcDateTime.toISOString().replace('T', ' ').replace('Z', '');
    return ISTDateTimeString;
  }

  function extractDateOnly(dateTimeString) {
    if (dateTimeString === '0000-00-00') {
        return dateTimeString; // Return as it is for special cases
    }
    const date = new Date(dateTimeString);
    const isoDate = date.toISOString();
    return isoDate.split('T')[0];
  }

  // Filter data based on logged-in user's EmpCode
  const filteredData = data.filter(request => request.EmpCode == loggedInEmpCode);

  return (
    <div className="leave-requests-list-container">
      <h2 className="list-title">My Leave Requests</h2>
      <table className="leave-requests-table">
        <thead>
          <tr style={{backgroundColor:"blue", color:"white" }}>
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
          {filteredData.map((request, i) => (
            <tr key={i} className={request.LeaveStatus === 'Pending' ? 'pending' : request.LeaveStatus === 'Approved' ? 'approved' : request.LeaveStatus === 'Denied' ? 'denied' : ''}>
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

export default LeaveRequestsList;
