import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import DetailMenu from "../pages/DetailMenu";


const routers = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
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

function Router(){
    return (
        <RouterProvider router={routers} />
    )
}

export default Router