import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Layout from "./layout/Layout.jsx";
import Features from "../pages/Features.jsx";
import LoginRegister from "../pages/LoginRegister.jsx";
import PostJob from "../pages/PostJob.jsx";
import Dashboard from "../pages/Dashboard.jsx";

let router = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children: [
            {path: "/", element: <Home />},
            {path: "/Features", element: <Features/>},
            {path: "/jobs", element: <PostJob/>},
            {path:"/login", element: <LoginRegister />},
            {
                path: "/dashboard",
                element: <Dashboard />
            }
        ]
    }
])

export default router