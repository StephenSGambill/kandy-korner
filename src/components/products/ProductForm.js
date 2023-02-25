import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"



export const ProductForm = () => {
    const [product, update] = useState([])
    const [types, updateTypes] = useState([])

    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then(response => response.json())
            .then((productTypesArray) => {
                updateTypes(productTypesArray)
            })
        },
        [types]
       )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        //creat object to be saved to API
        const productToSendToAPI = {
            name: product.name,
            price: product.price,
            typeId: parseInt(product.typeId)
            }
        
            
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            //change string to JSON object
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                //go to (route) ticket portion to page
                navigate("/products")
            })
    }

    return (
        <form className="productForm">
            <h2 className="prductForm__title">New Product Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What do you want to name your new product?"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
           
            <div className="form-group">
            <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        placeholder="Price per item?"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = parseInt(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            
            <div className="form-group">
            <label htmlFor="category">Category:</label>
                    <select 
                        className="typeCategoryChoice" 
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.typeId = evt.target.value
                                update(copy)
                            }}>
                        <option value="" >Choose a Category</option>
                        {types.map((type) => {
                            return <option value={type.id}>{type.category}</option>           
                        })}
                        
                    </select> 
                </div>
            </fieldset>

            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
                Submit New Product
            </button>
        </form>
    )
}