import { useNavigate } from "react-router-dom";

function JobRow({ title, status, applicants, jobId, logo }) {
    const navigate = useNavigate()

    return (

        <tr>

            <td className="d-flex align-items-center gap-2">

                {logo ? (

                    <img
                        src={logo}
                        width="30"
                        height="30"
                        style={{ borderRadius: "6px" }}
                    />

                ) : null}

                {title}

            </td>

            <td>
                <span className={`badge ${status === "Active"
                    ? "bg-success"
                    : "bg-secondary"
                    }`}>
                    {status}
                </span>
            </td>

            <td>{applicants}</td>

            <td>
                <button className="btn btn-sm btn-outline-primary" onClick={() => {navigate(`/jobs/${jobId}`)}}> 
                    View
                </button>
            </td>

        </tr>

    );
}

export default JobRow;