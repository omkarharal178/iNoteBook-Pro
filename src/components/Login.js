import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Assuming you have a CSS file for styling

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(" token is",json.jwtData);

     

        // Optionally store token in localStorage
        if (json.success) {
            localStorage.setItem('token', json.jwtData);
            props.showAlert("Login Successfuly", "success");
            navigate('/');

        } else {
            props.showAlert("Invalid Details", "danger");

        }
    }

     return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>iNoteBook Pro</h2>
                <p className="login-subtitle">Login to manage your notes</p>
                
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={onChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={onChange}
                    required
                />

                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default Login;
