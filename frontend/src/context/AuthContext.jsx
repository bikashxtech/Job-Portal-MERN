import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import axiosClient from "../apiClient.js";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    async function checkAuth() {
        try {
            const res = await axiosClient.get("/users/me")
            setUser(res.data)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        checkAuth();
    }, [])

    async function register(formData) {
        try {
            const res = await axiosClient.post("/users", formData);
            setUser(res.data)

            navigate("/dashboard")
        } catch (error) {
            console.error("Registration failed: ", error.response?.data || error.message);
            throw error;
        }
    }

    async function login(formData) {
        try {
            const res = await axiosClient.post("/users/login", formData)
            setUser(res.data);

            navigate("/dashboard")
        } catch (error) {
            console.error("Login failed", error.response?.data || error.message)
            throw error
        }
    }

    async function logout() {
        try {
            await axiosClient.post("/users/logout");
            setUser(null)
            navigate("/")
        } catch (error) {
            console.log("Logout failed:", error.response?.data || error.message);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
                checkAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);