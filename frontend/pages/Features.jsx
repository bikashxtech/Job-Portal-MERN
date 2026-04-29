import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard.jsx";

function Features() {
    return (
        <div className="container py-5">

            {/* HEADER */}
            <div className="text-center mb-5">
                <h2 className="fw-bold">
                    Powerful Features for Candidates & Recruiters 🚀
                </h2>
                <p className="text-muted">
                    Discover opportunities, manage applications, and hire smarter — all in one platform.
                </p>
            </div>

            <div className="row g-4">

                <FeatureCard
                    icon="bi-search"
                    title="Smart Job Search"
                    text="Filter jobs by skills, location, experience, and salary to find the best matches instantly."
                    link="/jobs"
                    linkText="Browse Jobs"
                />

                <FeatureCard
                    icon="bi-speedometer2"
                    title="Personalized Dashboard"
                    text="Track applications, view recommendations, and manage postings from one place."
                    link="/dashboard"
                    linkText="Open Dashboard"
                />

                <FeatureCard
                    icon="bi-send-check"
                    title="Easy Applications"
                    text="Apply quickly using saved resume and track application status in real time."
                    link="/applications"
                    linkText="View Applications"
                />

                <FeatureCard
                    icon="bi-briefcase"
                    title="Recruiter Job Management"
                    text="Post jobs, edit listings, and review applicants efficiently through a recruiter panel."
                    link="/jobs/manage"
                    linkText="Manage Jobs"
                />

                <FeatureCard
                    icon="bi-person-circle"
                    title="Profile Customization"
                    text="Update skills, experience, education, and resume to improve recommendations."
                    link="/profile/edit"
                    linkText="Edit Profile"
                />

                <FeatureCard
                    icon="bi-stars"
                    title="Smart Recommendations"
                    text="Receive job suggestions automatically based on your profile and interests."
                    link="/dashboard"
                    linkText="See Suggestions"
                />

            </div>


            <div className="text-center mt-5">
                <h4 className="fw-bold">
                    Start exploring opportunities today 💼
                </h4>

                <p className="text-muted">
                    Whether you're hiring talent or searching for your dream role — we’ve got you covered.
                </p>

                <Link to="/jobs" className="btn btn-primary me-3">
                    Find Jobs
                </Link>

                <Link to="/jobs/create" className="btn btn-outline-dark">
                    Post a Job
                </Link>
            </div>

        </div>
    );
}

export default Features;