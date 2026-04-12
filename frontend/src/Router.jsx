import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Layout from "./layout/Layout.jsx";
import Features from "../pages/Features.jsx";
import Login from "../pages/Login.jsx";
import PostJob from "../pages/PostJob.jsx";

let router = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children: [
            {path: "/", element: <Home />},
            {path: "/Features", element: <Features/>},
            {path: "/jobs", element: <PostJob/>},
            {path:"/login", element: <Login />}
        ]
    }
])

export default router