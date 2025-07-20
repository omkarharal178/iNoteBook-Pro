import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Assuming you have a CSS file for styling

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        if (password !== cpassword) {
            alert("Passwords do not match");
            return;
        }

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.jwtData);
            navigate('/');
            props.showAlert("Acount Created Successfuly", "success");

        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>iNoteBook Pro</h2>
                <p className="signup-subtitle">Create your free account</p>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={credentials.name}
                    onChange={onChange}
                    required
                />

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

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={credentials.confirmPassword}
                    onChange={onChange}
                    required
                />

                <button type="submit" className="signup-btn">Sign Up</button>
            </form>
        </div>
    );

}

export default Signup;
