import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./Cart.css"

export const Cart = () => {
    const [currentCustomer, setCurrentCustomer] = useState({})
    const [purchasesInCart, setpurchasesInCart] = useState([])
    const [products, setProducts] = useState([])
    const [types, setTypes] = useState([])

    const localUser = localStorage.getItem("kandy_user")
    const userObject = JSON.parse(localUser)

    useEffect(
        () => {
        fetch(`http://localhost:8088/customers?userId=${userObject.id}&_expand=user`)
            .then(response => response.json())
            .then((customer)=> {
                setCurrentCustomer(customer[0])
                })
        fetch(`http://localhost:8088/purchases?customerId=${userObject.id}&inCart=true`)
            .then(response => response.json())
            .then((inCartPurchases)=> {
                setpurchasesInCart(inCartPurchases)
                })
        fetch('http://localhost:8088/products')
            .then(response => response.json())
            .then((productType) => {
                setProducts(productType)
            })
        }, []
    )

    return <>
        <h2>Here is {currentCustomer?.user?.firstName} {currentCustomer?.user?.lastName}'s Cart</h2>
        <article className="cartPurchases" >
        
        {
            purchasesInCart.map((purchaseInCart) => {
                const foundCandy = products.find(product => purchaseInCart.productId === product.id )
                return <section className="cart_Items"
                    key={`purchase--${purchaseInCart.id}`}>
                    <header>Candy: {foundCandy?.name}</header>
                    <div>Cost: ${foundCandy?.price}</div>
                    <div>Amount in cart: {purchaseInCart?.productAmount}</div>
                    <div>Total cost for this item: ${foundCandy?.price * purchaseInCart?.productAmount}</div>

                    
                </section>
            
            })
        }
        </article>
        <button>Check Out</button>
    </>
}