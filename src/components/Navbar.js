// import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = (props) => {

    const navigator = useNavigate();
    const handelLogout = () => {
        localStorage.removeItem('token');
        navigator('/login');

    }
    // let location = useLocation();
    // useEffect(()=>{
    //     console.log(location.pathname);
    // }, [location]);

    return (
        <>
            <nav className={` mb-3 bg-primary-subtle navbar fixed-top navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand text-info fs-2" to="/">iNoteBook Pro</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/about">Abouts</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-info mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-info mx-2" to="/signup" role="button">Signup</Link>
                        </form> : <button className='btn btn-primary mx-2' onClick={handelLogout}>Logoute</button>
                        }

                        <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                            <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="switchCheckDefault" />
                            <label className="form-check-label" htmlFor="switchCheckDefault">Mode</label>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;