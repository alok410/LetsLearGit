import React, { useEffect, useState } from 'react';

function PendingRequestsPage() {
  const [pendingData, setPendingData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/empreq')
      .then(res => res.json())
      .then(data => setPendingData(data.filter(request => request.LeaveStatus === 'Pending')))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Pending Requests</h2>
      <table>
        <thead>
          <tr>
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
          {pendingData.map((request, i) => (
            <tr key={i}>
              <td>{request.EmpName}</td>
              <td>{request.EmpCode}</td>
              <td>{request.LeaveType}</td>
              <td>{request.LeaveReason}</td>
              <td>{request.LeaveStatus}</td>
              <td>{request.StartDate}</td>
              <td>{request.EndDate}</td>
              <td>{request.CreateOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingRequestsPage;
