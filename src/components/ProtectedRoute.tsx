import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

interface User{
    name:string
}
interface RootState{
    app:{
        user: User | null
    }
}
const ProtectedRoute:React.FC =()=>{
    const user = useSelector((state:RootState) => state.app.user);
    console.log("ProtectedRoute status - User:", user ? `Authenticated as ${user.name}` : "Not Authenticated");

    return user ? <Outlet /> : <Navigate to="/login" replace />
}
export default ProtectedRoute;