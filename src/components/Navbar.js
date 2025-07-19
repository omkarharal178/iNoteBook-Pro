// import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Navbar = () => {

     const navigator = useNavigate();
    const handelLogout=()=>{
        localStorage.removeItem('token');
        navigator('/login');

    }
    // let location = useLocation();
    // useEffect(()=>{
    //     console.log(location.pathname);
    // }, [location]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook Pro</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link"  aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/about">Abouts</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-2" to="/signup"  role="button">Signup</Link>
                        </form>:<button className='btn btn-primary'onClick={handelLogout}>Logoute</button>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;