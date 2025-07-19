import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <>
      <div className='container'mt-3>
          <h2>Login To Continew iNoteBook Pro</h2>
      </div>
        <div className="container my-3">
           
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onChange}
                        required
                        autoComplete="email"
                    
                        
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onChange}
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    );
};

export default Login;
