import React, { useEffect, useState } from 'react';
import './AllEmpPendingReq.css';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';


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
  

export const AllEmpPendingReq = () => {
    const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [reason, setReason] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedId , setselectedId] = useState('')

  const loggedInEmpCode = localStorage.getItem('empCode');
 useEffect(() => {
    fetch('http://localhost:8081/empreq')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);
  
  
  
  

  
  const pendingReq = data.filter(request => request.LeaveStatus == 'Pending');

  
  // const final = (loggedInEmpCode == 1005) ? pendingReqfinal :pendingReq ; 

  const ModelPopUP = (id) => {
    console.log('Leave request approved:', id);
    setselectedId(id)
    setModalIsOpen(true);
};
   

const handleApproveFinal = (selectedId) => {
  // Send request to server to update leave status to "Approved"
  fetch(`http://localhost:8081/empreq/${selectedId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      LeaveStatus: 'Approved'
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Leave request updated successfully:', data);
    // Update the local state instead of reloading the page
    const updatedPendingReq = pendingReq.filter(request => request.new_id !== selectedId);
    setData(updatedPendingReq);
    closeModal(); // Close the modal
  })
  .catch(err => console.error('Error updating leave request:', err));
};

const handleDenyFinal = (selectedId) => {
  fetch(`http://localhost:8081/empreq/${selectedId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      LeaveStatus: 'Denied'
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Leave request updated successfully:', data);
    // Update the local state instead of reloading the page
    const updatedPendingReq = pendingReq.filter(request => request.new_id !== selectedId);
    setData(updatedPendingReq);
    closeModal(); // Close the modal
  })
  .catch(err => console.error('Error updating leave request:', err));
};


    const closeModal = () => {
      setModalIsOpen(false);
      setReason('');
    };  

    
  return (
    <>
    <div className='heading-font'>All Employee Pending Request</div>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendingReq.map((request, i) => (
            <tr key={i}>
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
              <td>
              <button onClick={() => ModelPopUP(request.new_id)}>Open</button>
              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="confirmation-modal">
  <div className="modal-content">
    <h2>Confirmation</h2>
    <p>Please enter the reason:</p>
    <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
    <div style={{gap:"20px", padding:"30px"}} className="button-container">
      <button className="approve-btn" onClick={() => {closeModal(); handleApproveFinal(selectedId) }}>Approve</button>
      <button className="deny-btn" onClick={() => {  closeModal(); handleDenyFinal(selectedId) }}>Deny</button>
      <button className="cancel-btn" onClick={closeModal}>Cancel</button>
    </div>
  </div>
</Modal>

    </>

    
  )
}
