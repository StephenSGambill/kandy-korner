import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// import "./PurchaseForm.css"

export const PurchasesList = () => {
    const [purchases, setPurchases] = useState([])
    const [customer, setCustomer] = useState({})
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])

    const localUser = localStorage.getItem("kandy_user")
    const userObject = JSON.parse(localUser)


    useEffect(() => {

        fetch(`http://localhost:8088/users?id=${userObject.id}&_embed=customers`)
            .then(response => response.json())
            .then((customer) => {
                setCustomer(customer[0])

        fetch(`http://localhost:8088/purchases?customerId=${userObject.id}`)
            .then(response => response.json())
            .then((purchasesArray) => {
                setPurchases(purchasesArray)
        
        fetch(`http://localhost:8088/products?_embed=productTypes`)
            .then(response => response.json())
            .then((productsArray) => {
                setProducts(productsArray)

        
            }) 

                    })
            })
    }, []
    )


    return <>
        <h2>List of Purchases for {customer?.firstName} {customer?.lastName}</h2>

        <article className="purchases" >
            {
                purchases.map((purchase) => {
                    const thisProduct = products.find((product) => product.id === purchase.productId)
                    const totalCost = purchase?.productAmount * thisProduct?.price

                    return <section className="purchase" 
                    key={`purchase--${purchase.id}`}>
                        <header>Order #{purchase.id}</header>
                        <ul>
                            <li>Candy: {thisProduct?.name}</li>
                            <li>Amount: {purchase.productAmount}</li>
                            <li>Purchase Total: ${totalCost}</li>
                            <li>Purchase Date: {purchase.purchaseDate}</li>
                            
                        </ul>
                    </section>
                })
            }
        </article>
    </>
}