import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Ensure you import the CSS file

function App() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://l3ehqfjx5ejuw4wdadaumv5bya0zyuxb.lambda-url.eu-north-1.on.aws/')
            .then(response => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch employee data.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="App"><p>Loading...</p></div>;
    }

    if (error) {
        return <div className="App"><p>{error}</p></div>;
    }

    return (
        <div className="App">
            <h1>AWS Amplify - Lambda - Redshift Application</h1>
            {employees.length === 0 ? (
                <p>No employee data available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.employee_id}>
                                <td>{employee.employee_id}</td>
                                <td>{employee.first_name}</td>
                                <td>{employee.last_name}</td>
                                <td>{employee.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;
