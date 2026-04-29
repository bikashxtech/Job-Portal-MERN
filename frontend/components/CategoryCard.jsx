import { Link } from "react-router-dom";

function CategoryCard({ title }) {

    return (

        <div className="col-md-4">

            <Link
                to="/"
                className="text-decoration-none"
            >

                <div className="card border-0 shadow-sm p-4 h-100">

                    <h5 className="fw-semibold">
                        {title}
                    </h5>

                    <p className="text-muted">
                        Explore roles in {title}.
                    </p>

                </div>

            </Link>

        </div>

    );

}

export default CategoryCard;