import { Link } from "react-router-dom"
import "./EmployeeList.css"



export const Employee = ({firstName, lastName, email}) => {
    return <section className="employee" >
       <div>Name: {firstName} {lastName}</div>
        <div>Email: {email}</div>
    </section>
}