import { useEffect, useState } from "react"
import { getProducts } from "../ApiManager"



export const InventoryList = ({ searchTermsState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [productLocations, setProductLocations] = useState([])


    useEffect(
        () => {
            const searchedProducts = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchTermsState.toLowerCase())
            })
            setFilteredProducts(searchedProducts)
        },
        [searchTermsState]
    )


    useEffect(
        () => {
            getProducts()
                .then((productsArray) => {
                setProducts(productsArray)
                setFilteredProducts(productsArray)
                })
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/productLocations?_expand=location`)
                .then(response => response.json())
                .then((productLocationsArray) => {
                    setProductLocations(productLocationsArray)

                })
        },
        []
    )




    // you use curly braces {} for JavaScript expressions that return blocks of JSX code, and parentheses () for JavaScript expressions that return arrays of JSX elements
    return (
        <div>
          <h2>Inventory List</h2>
          <article className="products">
            {filteredProducts.map((product) => {
              const foundLocations = productLocations.filter((location) => 
                location.productId === product.id)
                return (
                <section className="product" key={`product--${product?.id}`}>
                    <div><b>Name: {product.name}</b></div>
                  {
                  foundLocations.map((location) => (
                    <>
                      <li key={location.id}>The location at {location?.location?.address} has {location?.amount} in stock</li>
                    </>
                  ))
                  }
                </section>
              )
            })}
          </article>
        </div>
      )
}
