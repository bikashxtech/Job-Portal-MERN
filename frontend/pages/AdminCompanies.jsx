import { useEffect, useState } from "react";
import axiosClient from "../src/apiClient";
import { Link } from "react-router-dom";

function AdminCompanies() {

    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        description: "",
        website: "",
        logo: ""
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        async function fetchCompanies() {

            try {

                const res =
                    await axiosClient.get("/companies");

                setCompanies(res.data);

            } catch (error) {

                console.error("Failed to load companies");

            }

        }

        fetchCompanies();

    }, []);

    const handleEdit = (company) => {

        setFormData({
            name: company.name,
            location: company.location,
            description: company.description || "",
            website: company.website || "",
            logo: company.logo || ""
        });

        setEditingId(company._id);
    };


    const handleDelete = async (id) => {

        if (!window.confirm("Delete company?"))
            return;

        await axiosClient.delete(`/companies/${id}`);

        setCompanies(
            companies.filter(c => c._id !== id)
        );

    };


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            let res;

            if (editingId) {

                res = await axiosClient.put(
                    `/companies/${editingId}`,
                    formData
                );

                setCompanies(
                    companies.map(c =>
                        c._id === editingId ? res.data : c
                    )
                );

                setEditingId(null);

            } else {

                res = await axiosClient.post(
                    "/companies",
                    formData
                );

                setCompanies([
                    ...companies,
                    res.data
                ]);

            }

            setFormData({
                name: "",
                location: "",
                description: "",
                website: "",
                logo: ""
            });

        } catch (error) {

            console.error("Company save failed");

        }

    };

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-4">

                <h3>Manage Companies</h3>

                <Link
                    to="/admin"
                    className="btn btn-outline-secondary"
                >
                    Back
                </Link>

            </div>


            {/* ADD COMPANY FORM */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <h5 className="mb-3">
                        Add New Company
                    </h5>

                    <form
                        className="row g-3"
                        onSubmit={handleSubmit}
                    >

                        <input
                            className="form-control"
                            placeholder="Company Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control"
                            placeholder="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control"
                            placeholder="Website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                        />

                        <textarea
                            className="form-control"
                            placeholder="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <textarea
                            className="form-control"
                            placeholder="Company Logo"
                            name="logo"
                            value={formData.logo}
                            onChange={handleChange}
                        />

                        <button className="btn btn-primary">
                            {editingId ? "Update Company" : "Add Company"}
                        </button>

                    </form>

                </div>

            </div>


            {/* COMPANY TABLE */}

            <table className="table table-hover">

                <thead>

                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Website</th>
                        <th></th>
                    </tr>

                </thead>

                <tbody>

                    {companies.map(company => (

                        <tr key={company._id}>

                            <td>

                                {company.logo ? (

                                    <img
                                        src={company.logo}
                                        width="40"
                                        height="40"
                                        style={{ borderRadius: "6px" }}
                                    />

                                ) : "-"}

                            </td>

                            <td>{company.name}</td>

                            <td>{company.location}</td>

                            <td>
                                {company.website ? (
                                    <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    >
                                    {company.website}
                                    </a>
                                ) : (
                                    "-"
                                )}
                            </td>

                            <td className="d-flex gap-2">

                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleEdit(company)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                        handleDelete(company._id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}

export default AdminCompanies;