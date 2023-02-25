import { useState, useEffect } from "react"
//import "./EmployeeList.css"
import { Employee } from "./Employee"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
         fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((employeeArray)=> {
                setEmployees(employeeArray)
            })
        },
        []
    )
        
    return <article className="employees">
    {
        
        employees.map(employee => 
        <Employee 
        key={`employee--${employee.id}`}
        id={employee.id} 
        firstName={employee.firstName} 
        lastName={employee.lastName} 
        email={employee.email} 
        />)
    }
    </article>
}