import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import DetailMenu from "../pages/DetailMenu";
import CreateMenu from "../pages/CreateMenu";
import EditMenu from "../pages/EditMenu";
import ProtectedRoute from "../hoc/ProtectedRoute";

function Router(){
    
    // catatan : penggunaan router juga bisa menggunakan useRoutes

    const routers = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedRoute element={<Home/>} />,
        },
        {
            path: "/login",
            element: <ProtectedRoute element={<Login/>} isLogin={true}/>,
        },
        {
            path: "/menu/:id",
            element: <ProtectedRoute element={<DetailMenu/>}/>,
        },
        {
            path: "/create-menu",
            element: <ProtectedRoute element={<CreateMenu/>}/>,
        },
        {
            path: "/edit/:id",
            element: <ProtectedRoute element={<EditMenu/>}/>,
        },
    ])

    return (
        <RouterProvider router={routers} />
    )
}

export default Router