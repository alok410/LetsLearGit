import React, { useEffect, useState } from 'react';
import './PrincipalLeaveRequestList.css';

import Icon_Clock from '../Imgs/Icon_Clock.webp';
import { Link } from 'react-router-dom';
import { AllEmpPendingReq } from './AllEmpPendingReq';


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
  

export const PrincipalLeaveRequestList = () => {
    const [data, setData] = useState([]);
  

 useEffect(() => {
    fetch('http://localhost:8081/empreq')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);
  
    

  
  const pendingReq = data.filter(request => request.LeaveStatus == 'Approved' || request.LeaveStatus == 'Denied');

  
  // const final = (loggedInEmpCode == 1005) ? pendingReqfinal :pendingReq ; 

  


    
    
  return (
    <>
        <div className='left-heading-font'> All Employee Approved and Denied Requests
            <div className="left-All">
                <Link to='/AllEmpPendingReq'>
                    <div className='left-left-Ico'>
                        <img className='left-pending_Icon' src={Icon_Clock} />
                        <div className='left-count'>{data.length - pendingReq.length }</div>
                    </div>
                </Link>
            </div>
        </div>
        <table className="manager-leave-requests-table">
            <thead>
                <tr style={{backgroundColor:"blue", color:"white"}}>
                    <th>chk</th>
                    <th>Id</th>
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
                    <tr key={i} className={request.LeaveStatus === 'Approved' ? 'approved' : request.LeaveStatus === 'Denied' ? 'denied' : ''}>
                        <td><input type="checkbox" /></td>
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
    </>
)

}



