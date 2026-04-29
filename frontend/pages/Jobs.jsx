import { useEffect, useState, useRef } from "react";
import axiosClient from "../src/apiClient.js";
import JobCard from "../components/JobCard.jsx";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const modalRef = useRef(null);

    const [filters, setFilters] = useState({
        keyword: "",
        location: "",
        skills: "",
        experience: "",
        minSalary: "",
        maxSalary: ""
    });


    const fetchJobs = async (customFilters = filters) => {

        try {

            const filteredParams = Object.fromEntries(
                Object.entries(customFilters).filter(
                    ([_, value]) => value !== ""
                )
            );

            const params = new URLSearchParams(filteredParams);

            const url = params.toString()
                ? `/jobs?${params.toString()}`
                : "/jobs";

            const res = await axiosClient.get(url);

            setJobs(res.data);

        } catch (error) {

            console.error("Failed to fetch jobs", error);

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchJobs();

    }, []);


    const handleChange = (e) => {

        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });

    };


    const applyFilters = () => {

        fetchJobs(filters);

        const modalInstance =
            window.bootstrap.Modal.getInstance(modalRef.current);

        modalInstance.hide();

    };


    if (loading) {
        return <h4 className="text-center mt-4">Loading jobs...</h4>;
    }


    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Available Jobs</h2>

                <button
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#filterModal"
                >
                    Filter Jobs 🔍
                </button>

            </div>


            {/* JOB LIST */}

            <div className="row g-4">

                {jobs.map(job => (

                    <div key={job._id} className="col-md-4">
                        <JobCard job={job} />
                    </div>

                ))}

            </div>


            {/* FILTER MODAL */}

            <div
                className="modal fade"
                id="filterModal"
                tabIndex="-1"
                ref={modalRef}
            >

                <div className="modal-dialog modal-lg">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h5 className="modal-title">
                                Filter Jobs
                            </h5>

                            <button
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>


                        <div className="modal-body">

                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label>Keyword</label>
                                    <input
                                        name="keyword"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>Location</label>
                                    <input
                                        name="location"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>Skills</label>
                                    <input
                                        name="skills"
                                        className="form-control"
                                        placeholder="React, Node"
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>Experience</label>
                                    <input
                                        type="number"
                                        name="experience"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>Minimum Salary</label>
                                    <input
                                        type="number"
                                        name="minSalary"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="col-md-6">
                                    <label>Maximum Salary</label>
                                    <input
                                        type="number"
                                        name="maxSalary"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                        </div>


                        <div className="modal-footer">

                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Jobs;