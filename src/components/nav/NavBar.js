import { Link, useNavigate } from "react-router-dom"
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localUser = localStorage.getItem("kandy_user")
   	const userObject = JSON.parse(localUser)

    if (userObject.staff){
        return <EmployeeNav />

    } else {
        return <CustomerNav />

    }
}


