import { useRef, useState } from "react";

function Login() {

    const [activeTab, setActiveTab] = useState("login");
    const [role, setRole] = useState("candidate");
    const [passwordError, setPasswordError] = useState("");

    const loginUserRef = useRef(null);
    const loginPasswordRef = useRef(null);

    const registerUserRef = useRef(null);
    const emailRef = useRef(null);
    const registerPasswordRef = useRef(null);
    const repeatPasswordRef = useRef(null);

    const isEmail = (input) => {
        return /\S+@\S+\.\S+/.test(input);
    };

    const handleChange = () => {

        if (
            registerPasswordRef.current.value !==
            repeatPasswordRef.current.value
        ) {
            setPasswordError("Passwords do not match");
        } else {
            setPasswordError("");
        }
    };

    async function handleLogin(e) {

        e.preventDefault();

        try {

            let id = loginUserRef.current.value;
            let password = loginPasswordRef.current.value;

            const payload = {};

            if (isEmail(id)) {
                payload.email = id;
            } else {
                payload.name = id;
            }

            payload.password = password;

            console.log("Login payload:", payload);

            // axios call here later

        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (passwordError) return;

        try {

            const payload = {
                username: registerUserRef.current.value,
                email: emailRef.current.value,
                password: registerPasswordRef.current.value,
                role: role
            };

            console.log("Register payload:", payload);

            // axios call here later

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="container mt-4">

            <ul className="nav nav-pills nav-justified mb-3">

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


            {activeTab === "login" && (

                <form onSubmit={handleLogin}>

                    <input
                        type="text"
                        ref={loginUserRef}
                        className="form-control mb-3"
                        placeholder="Email or username"
                    />

                    <input
                        type="password"
                        ref={loginPasswordRef}
                        className="form-control mb-3"
                        placeholder="Password"
                    />

                    <button className="btn btn-primary w-100">
                        Sign in
                    </button>

                </form>

            )}


            {activeTab === "register" && (

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        ref={registerUserRef}
                        className="form-control mb-3"
                        placeholder="Username"
                    />

                    <input
                        type="email"
                        ref={emailRef}
                        className="form-control mb-3"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        ref={registerPasswordRef}
                        className="form-control mb-3"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        ref={repeatPasswordRef}
                        className="form-control mb-2"
                        placeholder="Repeat password"
                        onChange={handleChange}
                    />

                    {passwordError && (
                        <div className="text-danger mb-2">
                            {passwordError}
                        </div>
                    )}

                    <select
                        className="form-control mb-3"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="candidate">Candidate</option>
                        <option value="recruiter">Recruiter</option>
                        {/*<option value="admin">Admin</option>*/}
                    </select>

                    <button className="btn btn-primary w-100">
                        Register
                    </button>

                </form>

            )}

        </div>
    );
}

export default Login;