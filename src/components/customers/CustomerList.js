import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getCustomerUser } from "../ApiManager"
import { Customer } from "./Customer"


export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const navigate = useNavigate()
   

    useEffect(
        () => {
            getCustomerUser()
            .then((customerArray)=> {
                setCustomers(customerArray)
                })
        },
        []
    )
        
    
    return <>
       
        <h2>List of Customers</h2>

        <article className="customers">
        {        
        customers.map(customer => 
        <Customer 
        key={`customer--${customer.user.id}`}
        firstName={customer.user.firstName} 
        lastName={customer.user.lastName} 
        email={customer.user.email} 
        loyaltyNumber={customer.loyaltyNumber}
        id={customer.user.id}
        />)
        }
    </article>
    </>
}