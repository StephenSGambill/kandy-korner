import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getCustomerByUserId, setCustomersByCustomerId } from "../ApiManager"



export const CustomerLoyaltyChange = () => {
    const {customerId} = useParams()
    const [customer, updateCustomer] = useState({
        userId: 0,
        loyaltyNumber: 0
    })
    const navigate = useNavigate()

    useEffect (
        () => {
                getCustomerByUserId(customerId)
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                    console.log(singleCustomer)
                })
        }, []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        
            setCustomersByCustomerId(customerId, customer)
            .then(() => {
                //go to (route) ticket portion to page
                navigate("/customers")
            })
        }

    return (<form 
            className="loyaltyForm">
                <h2>Modify Loyalty Number for: {customer?.user?.firstName} {customer?.user?.lastName}</h2>
            {/* <fieldset> */}
                <div className="form-group">
                    <label htmlFor="loyaltyNumber">Loyalty Number:</label>
                    <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={customer.loyaltyNumber}
                        onChange={
                            (evt) => {
                                const copy={...customer}
                                copy.loyaltyNumber = parseInt(evt.target.value) || 0
                                updateCustomer(copy)

                            }
                        } />
                </div>
            {/* </fieldset> */}
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                    Update
                </button>
            </form>
    )
}