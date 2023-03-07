import { Link, useNavigate, history } from "react-router-dom"
import "./EmployeeList.css"
import { EmployeeList } from "./EmployeesList"


export const Employee = ({ id, firstName, lastName, email, payRate, startDate, location, userId, handleDeleteButtonClick }) => {
    const navigate = useNavigate()
    const employeeId = id


    return <section className="employee" >
       
        <div>Name: {firstName} {lastName}</div>
        <div>Email: {email}</div>
        <div>Rate: ${payRate.toFixed(2)}</div>
        <div>Start Date: {startDate}</div>
        <div>Location: {location}</div>
        <button className="btn"
            onClick={(clickEvent) => {
                handleDeleteButtonClick(clickEvent, id, userId)
                
            }}

        >Fire Employee</button>
    </section>

}
