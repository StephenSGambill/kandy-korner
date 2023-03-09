import { Link } from "react-router-dom"
import "./CustomerList.css"
import { useState, useEffect } from "react"
import { getProducts } from "../ApiManager"
import { getPurchasesbyCustomerId } from "../ApiManager"


export const Customer = ({ firstName, lastName, email, loyaltyNumber, id, purchases, items }) => {

    const [products, setProducts] = useState([])
    const [customerPurchases, setCustomerPurchases] = useState([])
    


    useEffect(() => {
        getProducts()
            .then((productArray) => {
                setProducts(productArray)
            })
            getPurchasesbyCustomerId(id)
            .then((purchaseArray) => {
                setCustomerPurchases(purchaseArray)
            })
    }, []
    )

    // relied on ChatGPT for this after working a VERY long while trying to do it myself
    //still don't understand this fully
    const individualItems = () => {
        const lineItems = new Map();
      
        for (const customerPurchase of customerPurchases) {
          const productId = customerPurchase.productId;
          const productAmount = customerPurchase.productAmount;
      
          // Check if the product is already in the line items Map
          if (lineItems.has(productId)) {
            const existingItem = lineItems.get(productId);
            // If so, increment the quantity
            lineItems.set(productId, {
              product: existingItem.product,
              quantity: existingItem.quantity + productAmount
            });
          } else {
            // Otherwise, add a new line item with the product info and quantity
            const product = products.find(p => p.id === productId);
            lineItems.set(productId, {
              product: product,
              quantity: productAmount
            });
          }
        }
      
        // Convert the Map to an array of line item objects
        const lineItemArray = Array.from(lineItems.values());
      
        // Render the line item array as a list of items
        return (
          <ul>
            {lineItemArray.map(item => (
              <li key={item.product?.id}>
                {item.quantity} each of {item.product?.name} at ${item.product?.price} per item.
                = Total Cost ${item?.quantity * item.product?.price}
              </li>
            ))}
          </ul>
        );
      };
      

    // const individualItems = () => {
    //     let lineItems = []
    //     for (const customerPurchase of customerPurchases) {
    //         const product = products.find((product) => product.id === customerPurchase.productId);
    //         if (product) {
    //           lineItems.push(
    //             <li key={`${customerPurchase.productId}-${customerPurchase.productAmount}`}>
    //               {customerPurchase.productAmount} each of {product.name} at ${product.price} (Total: ${customerPurchase.productAmount * product.price})
    //             </li>
    //           );
    //         }
    //       }
    //       return lineItems;
    // }





    return <section className="customer" >
        <Link to={`/customers/${id}`}>Name: {firstName} {lastName}</Link>
        <div>Email: {email}</div>
        <div>Loyalty Number: #{loyaltyNumber}</div>
        <div>Total Items Purchased: {purchases}</div>
        <ul>Individual Purchases:</ul>
        {individualItems()}


    </section>
}
