import { useEffect, useState } from "react";
import axiosClient from "../src/apiClient.js";
import { Link } from "react-router-dom";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        async function fetchUsers() {

            const res = await axiosClient.get("/admin/users");
            setUsers(res.data);

        }

        fetchUsers();

    }, []);


    const deleteUser = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        await axiosClient.delete(`/admin/users/${id}`);

        setUsers(users.filter(user => user._id !== id));

    };


    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h3>Manage Users</h3>

                <Link
                    to="/admin"
                    className="btn btn-outline-secondary"
                >
                    Back
                </Link>

            </div>


            <table className="table table-hover">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {users.map(user => (

                        <tr key={user._id}>

                            <td>{user.name}</td>
                            <td>{user.email}</td>

                            <td>
                                <span className="badge bg-secondary">
                                    {user.role}
                                </span>
                            </td>

                            <td>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                        deleteUser(user._id)
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

export default AdminUsers;