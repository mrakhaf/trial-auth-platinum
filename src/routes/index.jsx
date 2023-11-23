import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import DetailMenu from "../pages/DetailMenu";
import { Navigate } from "react-router-dom";

function ProtectedRoute({redirectPath='/login'}) {
    const token = localStorage.getItem('accessToken')
    if(!token){
        return <Navigate to={redirectPath} replace />
    }

    return <Home/>
}

function Router(){
    const routers = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedRoute/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/menu/:id",
            element: <DetailMenu/>,
        }
    ])

    return (
        <RouterProvider router={routers} />
    )
}

export default Router