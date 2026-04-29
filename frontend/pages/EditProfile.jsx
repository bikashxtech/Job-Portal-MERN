import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../src/apiClient.js";
import { useAuth } from "../src/context/AuthContext.jsx";

function EditProfile() {

    const { user, checkAuth } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [companies, setCompanies] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        profilePic: "",
        company: "",
        skills: "",
        resume: "",
        experience: "",
        education: ""
    });

    useEffect(() => {

        if (user) {

            setFormData({
                name: user.name || "",
                email: user.email || "",
                profilePic: user.profilePic || "",
                company: user.company?._id || user.company || "",
                skills: user.skills?.join(", ") || "",
                resume: user.resume || "",
                experience: user.experience || "",
                education: user.education || ""
            });

        }

    }, [user]);

    useEffect(() => {

        async function fetchCompanies() {

            try {

                const res = await axiosClient.get("/companies");
                setCompanies(res.data);

            } catch (err) {

                console.error("Failed to load companies", err);

            }

        }

        fetchCompanies();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = Object.fromEntries(
                Object.entries({
                    ...formData,
                    skills: formData.skills
                        ? formData.skills.split(",").map(skill => skill.trim())
                        : undefined
                }).filter(([_, value]) =>
                    value !== "" &&
                    value !== null &&
                    value !== undefined
                )
            );

            await axiosClient.put(
                `/users/${user._id}`,
                payload
            );

            await checkAuth();

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Profile update failed"
            );

        }

    };


    return (

        <div className="container mt-5">

            <div className="card shadow-sm border-0 col-md-7 mx-auto">

                <div className="card-body">

                    <h4 className="mb-4 fw-bold">
                        Update Profile
                    </h4>

                    <form onSubmit={handleSubmit}>

                        {/* NAME */}
                        <div className="mb-3">
                            <label>Name</label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>


                        {/* EMAIL */}
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>


                        {/* PROFILE PIC */}
                        <div className="mb-3">
                            <label>Profile Picture URL</label>
                            <input
                                name="profilePic"
                                value={formData.profilePic}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>


                        {/* COMPANY recruiter */}
                        {user?.role === "recruiter" && (
                        <>
                            <div className="mb-3">
                                <label>Company</label>

                                <select
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="">
                                        Select Company
                                    </option>

                                    {companies.map(company => (

                                        <option
                                            key={company._id}
                                            value={company._id}
                                        >
                                            {company.name}
                                        </option>

                                    ))}

                                </select>
                            </div>
                        </>
                        )}
                        


                        {/* CANDIDATE ONLY FIELDS */}
                        {user?.role === "candidate" && (
                            <>
                                <div className="mb-3">
                                    <label>
                                        Skills (comma separated)
                                    </label>

                                    <input
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Enter Your skills"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label>Resume URL</label>

                                    <input
                                        name="resume"
                                        value={formData.resume}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label>
                                        Experience (years)
                                    </label>

                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label>Education</label>

                                    <input
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                            </>
                        )}


                        {/* ERROR MESSAGE */}
                        {error && (
                            <p className="text-danger mt-2">
                                {error}
                            </p>
                        )}


                        {/* SUBMIT BUTTON */}
                        <button className="btn btn-primary w-100">
                            Save Changes
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditProfile;