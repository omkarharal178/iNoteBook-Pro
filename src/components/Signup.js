import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        
        <>
        <div className='container'mt-3>
          <h2> Create Account and Use iNoteBook Pro</h2>
      </div>
        <div className='container my-3'>
           
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name'
                        onChange={onChange} value={credentials.name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email'
                        onChange={onChange} value={credentials.email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password'
                        onChange={onChange} value={credentials.password} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword'
                        onChange={onChange} value={credentials.cpassword} minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}

export default Signup;
