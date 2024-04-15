
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gperigtu'
});

app.get('/empreq', (req, res) => {
  const sql = 'SELECT * FROM empreq';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving leave requests' });
    } else {
      console.log('Leave requests:', results);
      res.json(results);
    }
  });
});

app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Error retrieving leave requests' });
      } else {
        console.log('Leave requests:', results);
        res.json(results);
      }
    }); 
  });       

  


  
  app.post('/empreq', (req, res) => {
    const { empName, empCode, leaveType, leaveReason, startDate, endDate,LeaveStatus } = req.body; 
    const CreateOn =  new Date();
    const sql = 'INSERT INTO empreq (EmpName, EmpCode, LeaveType, LeaveReason, StartDate, EndDate,CreateOn,LeaveStatus) VALUES (?, ?, ?, ?, ?, ?,?,?)';
    db.query(sql, [empName, empCode, leaveType, leaveReason, startDate, endDate,CreateOn,LeaveStatus], (err, result) => {
        if (err) {
            console.error('Error adding leave request:', err);
            res.status(500).json({ error: 'Error adding leave request' });
        } else {
            console.log('Leave request added successfully');
            res.status(200).json({ message: 'Leave request added successfully' });
        }
    });
});

  

//   app.post('/employees', (req, res) => {
//     const { empCode, empName, empBranch, empRole, empPass } = req.body;
    
//     // SQL query to insert data into the empreq table
//     const sql = 'INSERT INTO employees (EmpCode, EmpName, EmpBranch, EmpRole, EmpPass) VALUES (?, ?, ?, ?, ?)';
    
//     // Execute the query
//     db.query(sql, [empCode, empName, empBranch, empRole, empPass], (err, result) => {
//       if (err) {
//         console.error('Error adding leave request:', err);
//         res.status(500).json({ error: 'Error adding leave request' });
//       } else {
//         console.log('Leave request added successfully');
//         res.status(200).json({ message: 'Leave request added successfully' });
//       }
//     });
//   });
  



app.put('/empreq/:id', (req, res) => {
  const { id } = req.params;
  const { LeaveStatus, reqReason } = req.body; // Fields to update from request body
  
  // Construct SQL query
  const sql = `UPDATE empreq SET LeaveStatus = ?, reqReason = ? WHERE new_id = ?d`;
  
  // Execute the query with the specified ID
  db.query(sql, [LeaveStatus, reqReason, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error updating leave request' });
    } else {
      console.log('Leave request updated:', results.affectedRows);
      res.json({ message: 'Leave request updated successfully' });
    }
  });
});



app.get('/empreq/:id', (req, res) => {
  const empReqId = req.params.id;
  const sql = 'SELECT * FROM empreq WHERE new_id = ?'; // Modify this query to filter by ID
  db.query(sql, [empReqId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving leave request' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Leave request not found' });
      } else {
        console.log('Leave request:', results[0]);
        res.json(results[0]);
      }
    }
  });
});





app.listen(8081, () => {
console.log("Server is running on port 8081");
});