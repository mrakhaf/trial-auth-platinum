import { Navigate } from "react-router-dom"


// catatan: ProtectedRoute bisa dengan menggunakan lib Outlet react-router-dom

function ProtectedRoute({element, isLogin=false}) {
    const token = localStorage.getItem('accessToken')

    if (!isLogin && !token) {
        return <Navigate to={'/login'} replace />
    } 

    if (isLogin && token) {
        return <Navigate to={'/'} replace />
    }

    return element
}

export default ProtectedRoute