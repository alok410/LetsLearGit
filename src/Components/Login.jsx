import React, { useEffect, useState } from 'react';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [empCode, setEmpCode] = useState("");
    const [empPass, setEmpPass] = useState("");
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [empName, setEmpName] = useState("");
    const [employees, setEmployees] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8081/employees')
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => console.log(err));

        // Check if user is logged in from local storage
        const storedLoggedIn = localStorage.getItem('loggedIn');
        const storedEmpName = localStorage.getItem('empName');
        const storedEmpCode = localStorage.getItem('empCode');

        if (storedLoggedIn === 'true' && storedEmpName && storedEmpCode) {
            setLoggedIn(true);
            setEmpName(storedEmpName);
            setEmpCode(storedEmpCode);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        const empCodeInt = parseInt(empCode); // Convert empCode to integer

        const employee = employees.find(emp => parseInt(emp.empCode) === empCodeInt);

        if (employee) {
            if (employee.empPass === empPass) {
                setLoggedIn(true);
                setEmpName(employee.empName);
                setMessage(`${employee.empName} login successful!`);
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('empName', employee.empName);
                localStorage.setItem('empCode', employee.empCode); // Store empCode in local storage
             
                // Reload the page after successful login
                window.location.reload();
            } else {
                setMessage("Incorrect password. Please try again.");
            }
        } else {
            setMessage("Employee code not found. Please try again.");
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setEmpCode("");
        setEmpPass("");
        setMessage("");
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('empName');
        localStorage.removeItem('empCode'); // Remove empCode from local storage
        window.location.reload();
    };

    return (
        <div className="login-container">
            {loggedIn ? (
                <>
                    <p>Welcome, {empName}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="empCode">Employee Code</label>
                            <input type="text" id="empCode" name="empCode" value={empCode} onChange={(e) => setEmpCode(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="empPass">Password</label>
                            <input type="password" id="empPass" name="empPass" value={empPass} onChange={(e) => setEmpPass(e.target.value)} required />
                        </div>
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    {message && <p>{message}</p>}
                </>
            )}
        </div>
    );
};

export default Login;
