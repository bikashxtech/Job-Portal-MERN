import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

function Navbar() {

    let {user, logout} = useAuth();
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand ps-3" href="#">Job Portal</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/features">Features</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Jobs">Jobs</Link>
                            </li>
                            {user && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                            )}
                        </ul>
                        
                        
                        {user ? (

                            <button
                                className="btn btn-danger ms-auto me-3"
                                onClick={logout}
                            >
                                Logout
                            </button>

                        ) : (

                            <Link
                                className="btn btn-primary ms-auto me-3"
                                to="/login"
                            >
                                Login / Register
                            </Link>

                        )}
                        
                    </div>
                </div>
                
            </nav>
        </>
    )
}

export default Navbar