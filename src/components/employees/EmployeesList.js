import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
//import "./EmployeeList.css"
import { Employee } from "./Employee"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()
      

    useEffect(
        () => {
         fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
            .then(response => response.json())
            .then(setEmployees)//this works! instead of below
            // .then((employeeArray)=> {
                
            //     setEmployees(employeeArray)
            //                })
        },
        []
    )
        
    
    return <>
        <h2>List of Employees</h2>
        {
            <button onClick={() => navigate("/employees/create")}>Creat New Employee</button>
        }

        <article className="employees">
        {        
        employees.map(employee => 
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
       
        
        />)
        }
        
    </article>
    </>
}