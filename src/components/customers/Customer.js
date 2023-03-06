import { Link } from "react-router-dom"
import "./CustomerList.css"


export const Customer = ({firstName, lastName, email, loyaltyNumber, id}) => {
    return <section className="customer" >
        <Link to={`/customers/${id}`}>Name: {firstName} {lastName}</Link>
        <div>Email: {email}</div>
        <div>Loyalty Number: #{loyaltyNumber}</div>
                
    </section>
}