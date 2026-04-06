import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"

export const AdminRoute = () => {
  const {userInfo}=useSelector(state=>state.auth)
  return userInfo && userInfo.isadmin? (<Outlet/>):
  (<Navigate to='login' replace/>)
}
