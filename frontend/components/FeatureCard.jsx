import { Link } from "react-router-dom";

function FeatureCard({ icon, title, text, link, linkText }) {
    return (
        <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 text-center p-3">

                <div className="mb-3">
                    <i className={`bi ${icon} fs-1 text-primary`}></i>
                </div>

                <h5 className="fw-semibold">{title}</h5>

                <p className="text-muted">{text}</p>

                <Link
                    to={link}
                    className="btn btn-outline-primary btn-sm mt-auto"
                >
                    {linkText}
                </Link>

            </div>
        </div>
    );
}

export default FeatureCard;