import { Link } from "react-router-dom";

function Unauthorized() {

    return (

        <div className="container text-center mt-5">

            <h2 className="text-danger">
                Access Denied 🚫
            </h2>

            <p className="text-muted">
                You do not have permission to view this page.
            </p>

            <Link to="/" className="btn btn-primary">
                Go Home
            </Link>

        </div>

    );
}

export default Unauthorized;