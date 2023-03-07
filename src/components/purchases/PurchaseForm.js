import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getProductById, setPurchase } from "../ApiManager"
import "./PurchaseList.css"

export const PurchaseForm = ( ) => {
    const {productId} = useParams()
    const [product, setProduct] = useState([])
    
    const localUser = localStorage.getItem("kandy_user")
    const userObject = JSON.parse(localUser)

    const [newPurchase, updateNewPurchase] = useState({
        customerId: userObject.id,
        productId: parseInt(productId),
        productAmount: 0,
        purchaseDate: "",
        inCart: true
    })

    const navigate = useNavigate()

    useEffect(
        () => {
                getProductById(productId)
                .then((thisProduct) => {
                    setProduct(thisProduct)
                })
        },
        []
    )



    const handleSaveButtonClick = (event) => {
        event.preventDefault()
               
            setPurchase(newPurchase)
            .then(() => {
              
               navigate("/cart")
            })
        }




    return (<form
            className="purchaseForm">
                <h2>Purchase - {product.name}</h2>
                <h3>${product.price} per item</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="amount">How many would you like user #{userObject.id}?</label>
                <input 
                    required autoFocus
                    type="text"
                    id="amount"
                    className="form-control"
                    value={newPurchase.productAmount}
                    onChange={(evt) =>{
                        const copy = {...newPurchase}
                        copy.productAmount = parseInt(evt.target.value) || 0
                        copy.purchaseDate = Date()
                        updateNewPurchase(copy)
            }} />
        </div>
        </fieldset>
        <button
            className="btn btn-primary"
            onClick={(evt) => {
            const copy = {...newPurchase}
            handleSaveButtonClick(evt)}
            }>Save Purchase
        </button>
        </form>
    )
}