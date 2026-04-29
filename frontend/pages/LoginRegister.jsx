import { useRef, useState } from "react";
import axiosClient from "../src/apiClient.js"
import { useAuth } from "../src/context/AuthContext.jsx";
 
function LoginRegister() {
    const {login, register} = useAuth();

    const [activeTab, setActiveTab] = useState("login");

    const [loginData, setLoginData] = useState({
        identifier: "",
        password: ""
    })

    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        role: "candidate"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    const isEmail = (input) => /\S+@\S+\.\S+/.test(input);

    async function handleLogin(e) {
        e.preventDefault()

        setError("")
        setLoading(true)

        try {
            const payload = isEmail(loginData.identifier)
                ? {email: loginData.identifier} 
                : {username: loginData.identifier}
            payload.password = loginData.password
            await login(payload);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false)
        }
    }

    async function handleRegister (e) {

        e.preventDefault();

        if (registerData.password !== registerData.repeatPassword) {
            return setError("Passwords do not match");
        }

        setError("");
        setLoading(true);

        try {

            await register({
                name: registerData.username,
                email: registerData.email,
                password: registerData.password,
                role: registerData.role
            });

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="container mt-5" style={{ maxWidth: "500px" }}>

            <ul className="nav nav-pills nav-justified mb-4">

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "register" ? "active" : ""}`}
                        onClick={() => setActiveTab("register")}
                    >
                        Register
                    </button>
                </li>

            </ul>


            {/* LOGIN FORM */}

            {activeTab === "login" && (

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Email or username"
                        value={loginData.identifier}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                identifier: e.target.value
                            })
                        }
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                password: e.target.value
                            })
                        }
                        required
                    />

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <button
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                </form>
            )}


            {/* REGISTER FORM */}

            {activeTab === "register" && (

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Username"
                        value={registerData.username}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                username: e.target.value
                            })
                        }
                        required
                    />

                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Email"
                        value={registerData.email}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                email: e.target.value
                            })
                        }
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={registerData.password}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                password: e.target.value
                            })
                        }
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Repeat password"
                        value={registerData.repeatPassword}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                repeatPassword: e.target.value
                            })
                        }
                        required
                    />

                    <select
                        className="form-control mb-3"
                        value={registerData.role}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                role: e.target.value
                            })
                        }
                    >
                        <option value="candidate">Candidate</option>
                        <option value="recruiter">Recruiter</option>
                    </select>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <button
                        className="btn btn-success w-100"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                </form>
            )}

        </div>
    );
}

export default LoginRegister;