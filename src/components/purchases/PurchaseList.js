import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
// import "./PurchaseForm.css"

export const PurchasesList = () => {
   const [purchases, setPurchases] = useState([])
   const [customers, setCustomers] = useState([])
   const [users, setUsers] = useState([])
   const navigate = useNavigate()

   useEffect(
    () => {
        fetch(`http://localhost:8088/purchases`)
        .then(response => response.json())
        .then((purchasesArray) => {
            setPurchases(purchasesArray)
        })
    },
    []
   )

    useEffect(() => {
        fetch(`http://localhost:8088/customers`)
        .then(response => response.json())
        .then((customersArray) => {
            setCustomers(customersArray)
        
        })
    }, 
        []
    )

    useEffect(() => {
        fetch(`http://localhost:8088/users`)
        .then(response => response.json())
        .then((usersArray) => {
            setUsers(usersArray)
        })
    }, []
    )

    return <>
    <h2>List of Purchases</h2>

    <article className="purchases" >
    {
    purchases.map((purchase) => {
        const foundCustomerId = customers.find((customer) => purchase.customerId === customer.userId)
        const foundUser = users.find((user) => foundCustomerId?.userId === user.id)
            return <section className="purchase" key={`purchase--${purchase.id}`}>
            <header>Order Number: {purchase.customerId}</header>
            <footer>Customer: {foundUser?.firstName} {foundUser?.lastName}</footer>
        </section>
    }
    )
    }
    </article>
    </>

}