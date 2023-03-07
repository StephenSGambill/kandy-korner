import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEmployeeUser, getEmployeeLocation } from "../ApiManager"
//import "./EmployeeList.css"
import { Employee } from "./Employee"


export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()
      

    useEffect(
        () => {
            getEmployeeLocation()
            .then(setEmployees)
        },
        [] 
    )        
        
           
    const handleDeleteButtonClick = (event, id, userId) => {
        event.preventDefault()
            //deleteEmployeeUser(id, userId)
            //couldn't get this one to work with API (refresh problem)
            return fetch(`http://localhost:8088/employees/${id}`,
            { method: "DELETE" })
            .then(() => {
              
                fetch(`http://localhost:8088/users/${userId}`,
                    { method: "DELETE" })

                    .then (() => {
                        fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
                        .then(response => response.json())

                    .then(setEmployees)
                })})}
                    

    
    return <>
        <h2>List of Employees</h2>
        {
            <button onClick={() => navigate("/employees/create")}>Creat New Employee</button>
        }

        <article className="employees">
        {        
        employees?.map(employee => 
        <Employee 
        key={`employee--${employee.id}`}
        id={employee.id} 
        firstName={employee?.user?.firstName} 
        lastName={employee?.user?.lastName} 
        email={employee?.user?.email} 
        payRate={employee?.payRate}
        startDate={employee?.startDate}
        location={employee?.location?.address}
        userId={employee?.user?.id}
        handleDeleteButtonClick={handleDeleteButtonClick}
       
        
        />)
        }
        
    </article>
    </>
}