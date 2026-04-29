import { Link } from "react-router-dom";
import Jobs from "./Jobs.jsx";
import { useAuth } from "../src/context/AuthContext.jsx";

import CategoryCard from "../components/CategoryCard.jsx";
import Step from "../components/StepCard.jsx";

function Home() {

    const { user } = useAuth();

    return (

        <div
            style={{
                fontFamily: "'DM Sans', sans-serif",
                background: "#f5f0e8",
                color: "#0f0e0c"
            }}
        >

            <section
                className="container-fluid"
                style={{ minHeight: "80vh" }}
            >

                <div className="row align-items-center">

                    <div className="col-md-6 px-5 py-5">

                        <p
                            style={{
                                fontSize: 12,
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "#c94f2b"
                            }}
                        >
                            Find your next opportunity
                        </p>

                        <h1
                            style={{
                                fontFamily: "'Fraunces', serif",
                                fontWeight: 900,
                                fontSize: "clamp(42px, 5vw, 70px)"
                            }}
                        >
                            Work that{" "}
                            <em
                                style={{
                                    fontWeight: 300,
                                    color: "#c94f2b"
                                }}
                            >
                                fits
                            </em>
                            <br />
                            who you are.
                        </h1>

                        <p
                            className="text-muted mt-4"
                            style={{ maxWidth: "420px" }}
                        >
                            Explore curated opportunities from companies that
                            value talent, innovation, and people-first culture.
                        </p>

                        <div className="mt-4 d-flex gap-3">

                            <Link
                                to="/jobs"
                                className="btn btn-dark"
                            >
                                Browse Jobs
                            </Link>

                            {user?.role === "recruiter" && (

                                <Link
                                    to="/jobs/create"
                                    className="btn btn-outline-dark"
                                >
                                    Post a Job
                                </Link>

                            )}

                        </div>

                    </div>

                    <div className="col-md-6 px-5 py-5">

                        <div className="card shadow-sm border-0 p-4">

                            <h5 className="fw-semibold">
                                Why use this portal?
                            </h5>

                            <ul className="mt-3 text-muted">

                                <li>
                                    Smart job recommendations based on your skills 🤖
                                </li>

                                <li>
                                    Easy application tracking dashboard 📊
                                </li>

                                <li>
                                    Recruiter-friendly job management tools 💼
                                </li>

                                <li>
                                    Fast and secure application workflow ⚡
                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

            </section>

            <section
                style={{
                    background: "#e8dfc8",
                    padding: "70px"
                }}
            >

                <div className="container text-center">

                    <h3 className="fw-bold mb-5">
                        Explore Opportunities by Category
                    </h3>

                    <div className="row g-4">

                        <CategoryCard title="Engineering" />
                        <CategoryCard title="Design" />
                        <CategoryCard title="Data Science" />
                        <CategoryCard title="Product Management" />
                        <CategoryCard title="Marketing" />
                        <CategoryCard title="DevOps" />

                    </div>

                </div>

            </section>

            <section className="container py-5 text-center">

                <h3 className="fw-bold mb-4">
                    How It Works ⚙️
                </h3>

                <div className="row">

                    <Step
                        title="Create Profile"
                        text="Add skills, education, and experience to personalize recommendations."
                    />

                    <Step
                        title="Apply to Jobs"
                        text="Submit applications instantly with your saved resume."
                    />

                    <Step
                        title="Track Progress"
                        text="Monitor application status directly from your dashboard."
                    />

                </div>

            </section>

            <section
                style={{
                    background: "#c94f2b",
                    padding: "60px"
                }}
            >

                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">

                    <h2
                        style={{
                            fontFamily: "'Fraunces', serif",
                            color: "white"
                        }}
                    >
                        Ready to find your{" "}
                        <em style={{ fontWeight: 300 }}>
                            next chapter?
                        </em>
                    </h2>

                    <Link
                        to="/jobs"
                        className="btn btn-light mt-3 mt-md-0"
                    >
                        Browse All Jobs
                    </Link>

                </div>

            </section>

        </div>

    );
}



export default Home;