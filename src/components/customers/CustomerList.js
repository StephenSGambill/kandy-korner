import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getCustomerUser, getPurchases } from "../ApiManager"
import { Customer } from "./Customer"


export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [purchases, setPurchases] = useState([])
   
   
    useEffect(
        () => {
            getCustomerUser()
                .then((customerArray) => {
                    setCustomers(customerArray)
                })
            getPurchases()
                .then((purchasesArray) => {
                    setPurchases(purchasesArray)

                })
        },
        []
    )

    const totalCustomerItems = () => {
       
       for (let customer of customers){
        let purchaseCount = 0
            for (let purchase of purchases) {
                if (customer.id === purchase.customerId) {
                    purchaseCount += purchase.productAmount
                    }
                }
                
                customer.itemsTotal = purchaseCount
            }
    }


    const customerItems = (customerId) => {
        let customerItemList = []
        for (let purchase of purchases) {
            if (purchase.customerId === customerId){
                customerItemList.push(purchase.productId)
            }
        }
        return customerItemList
    }
   
    return <>
        <h2>List of Customers</h2>
            <article className="customers">
                {totalCustomerItems()}
            {
                customers.sort((a, b) => b.itemsTotal - a.itemsTotal).map(customer =>
                    <Customer
                        key={`customer--${customer.user.id}`}
                        firstName={customer.user.firstName}
                        lastName={customer.user.lastName}
                        email={customer.user.email}
                        loyaltyNumber={customer.loyaltyNumber}
                        id={customer.user.id}
                        purchases={customer.itemsTotal}
                        items={customerItems(customer.id)}
                    />)
            }

        </article>
    </>
}