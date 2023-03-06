import { Link, useNavigate, history } from "react-router-dom"
import "./EmployeeList.css"
import { EmployeeList } from "./EmployeesList"






export const Employee = ({ id, firstName, lastName, email, payRate, startDate, location, userId }) => {
    const navigate = useNavigate()
    const employeeId = id


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/employees/${employeeId}`,
            { method: "DELETE" })
            .then(response => response.json())
            .then(() => {
              
                fetch(`http://localhost:8088/users/${userId}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(() => {
                    window.location.reload()///***NEW***
                    //used this because navigate wouldn't work, error something about not calling in function
                    //navigate("/employees") WOULDN'T WORK
                    //history.goBack('/employees') WOULDN'T WORK
                    })
            }
            )
    }


    return <section className="employee" >
       
        <div>Name: {firstName} {lastName}</div>
        <div>Email: {email}</div>
        <div>Rate: ${payRate.toFixed(2)}</div>
        <div>Start Date: {startDate}</div>
        <div>Location: {location}</div>
        <button className="btn"
            onClick={(clickEvent) => {
                handleSaveButtonClick(clickEvent)
                
            }}

        >Fire Employee</button>
    </section>

}
