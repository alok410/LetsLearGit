import React, { useState } from 'react';
import './LeaveRequestForm.css'; // Import the CSS file for styling

function LeaveRequestForm() {
  const [empName, setEmpName] = useState('');
  const [empCode, setEmpCode] = useState(window.localStorage.empCode);
  const [leaveType, setLeaveType] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        

        const response = await fetch('http://localhost:8081/empreq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                empName,
                empCode : window.localStorage.empCode,
                
                leaveType,
                leaveReason,
                startDate,
                endDate,
                LeaveStatus:"Pending",
            
               
            }),
        });
        if (response.ok) {
            console.log('Leave request submitted successfully');
            // Optionally, you can reset the form fields here
            setEmpName('');
            setEmpCode('');
            setLeaveType('');
            setLeaveReason('');
            setStartDate('');
            setEndDate('');
        } else {
            console.error('Failed to submit leave request');
        }
    } catch (error) {
        console.error('Error submitting leave request:', error);
    }
};


  return (
    <div className="leave-request-form-container">
      <h2 className="form-title"> Leave Request Form</h2>
      <form onSubmit={handleSubmit} className="leave-request-form">
        <label className="form-label">
          Employee Name:
          <input
            type="text"
            className="form-input"
            value={empName}
            onChange={(e) => setEmpName(e.target.value)}
          />
        </label>
        <label className="form-label">
          Employee Code:
          <input
          disabled
            type="text"
            className="form-input"
            value={empCode}
            onChange={(e) => setEmpCode(e.target.value)}
          />  
        </label>
        <label className="form-label">
          Leave Type:
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="form-select"
          >
            <option value="">Select Leave Type</option>
            <option value="CL">CL</option>
            <option value="DL">DL</option>
            <option value="LWP">LWP</option>
          </select>
        </label>
        <label className="form-label">
          Leave Reason:
          <input
            type="text"
            className="form-input"
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
          />
        </label>
        <label className="form-label">
          Start Date:
          <input
            type="date"
            className="form-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="form-label">
          End Date:
          <input
            type="date"
            className="form-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
}

export default LeaveRequestForm;


