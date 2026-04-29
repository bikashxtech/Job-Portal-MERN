import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="bg-dark text-light mt-5 pt-4">

            <div className="container">

                <div className="row">

                    <div className="col-md-4 mb-3">

                        <h5 className="fw-bold">
                            Job Portal
                        </h5>

                        <p className="text-muted">

                            Connecting talented candidates with great opportunities
                            and helping recruiters hire smarter.

                        </p>

                    </div>


                    <div className="col-md-2 mb-3">

                        <h6 className="fw-semibold">
                            Quick Links
                        </h6>

                        <ul className="list-unstyled">

                            <li>
                                <Link to="/" className="text-decoration-none text-light">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link to="/features" className="text-decoration-none text-light">
                                    Features
                                </Link>
                            </li>

                            <li>
                                <Link to="/jobs" className="text-decoration-none text-light">
                                    Jobs
                                </Link>
                            </li>

                            <li>
                                <Link to="/dashboard" className="text-decoration-none text-light">
                                    Dashboard
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* RECRUITER LINKS */}
                    <div className="col-md-3 mb-3">

                        <h6 className="fw-semibold">
                            Recruiters
                        </h6>

                        <ul className="list-unstyled">

                            <li>
                                <Link to="/jobs/create" className="text-decoration-none text-light">
                                    Post a Job
                                </Link>
                            </li>

                            <li>
                                <Link to="/jobs/manage" className="text-decoration-none text-light">
                                    Manage Jobs
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* PROFILE LINKS */}
                    <div className="col-md-3 mb-3">

                        <h6 className="fw-semibold">
                            Profile
                        </h6>

                        <ul className="list-unstyled">

                            <li>
                                <Link to="/profile/edit" className="text-decoration-none text-light">
                                    Edit Profile
                                </Link>
                            </li>

                            <li>
                                <Link to="/applications" className="text-decoration-none text-light">
                                    My Applications
                                </Link>
                            </li>

                        </ul>

                    </div>

                </div>

                <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">

                    <small className="text-white">
                        © {new Date().getFullYear()} Job Portal. All rights reserved.
                    </small>

                    <div>

                        <a
                            href="#"
                            className="text-light me-3"
                        >
                            <i className="bi bi-linkedin"></i>
                        </a>

                        <a
                            href="#"
                            className="text-light me-3"
                        >
                            <i className="bi bi-github"></i>
                        </a>

                        <a
                            href="#"
                            className="text-light"
                        >
                            <i className="bi bi-envelope"></i>
                        </a>

                    </div>

                </div>

            </div>

        </footer>

    );
}

export default Footer;