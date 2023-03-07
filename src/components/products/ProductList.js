import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getProducts, getProductTypes } from "../ApiManager"
import "./ProductList.css"

export const ProductsList = ({ searchTermsState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [productTypes, setProductTypes] = useState([])

    const [topProduct, updateTopProduct] = useState(false)

    const localUser = localStorage.getItem("kandy_user")
    const userObject = JSON.parse(localUser)

    const navigate = useNavigate()


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
            getProductTypes()
                .then((productTypesArray) => {
                    setProductTypes(productTypesArray)
                })
        },
        []
    )


    useEffect(() => {
        if (topProduct) {
            const topProducts = products.filter(product =>
                product.price > 2)
            setFilteredProducts(topProducts)
        }
        else {
            setFilteredProducts(products)
        }
    }, [topProduct]
    )



    return <>
        {
            userObject.staff
                ?
                <>
                    <button onClick={() => updateTopProduct(true)}>Top Products</button>
                    <button onClick={() => updateTopProduct(false)}>All Products</button>
                    <button onClick={() => navigate("/product/create")}>Create New</button>
                </>
                : ""
        }

        <h2>List of Products</h2>

        <article className="products" >
            {
                filteredProducts.map((product) => {
                    const productType = productTypes.find((productType) =>
                        productType.id === product.typeId)

                    return <section className="product" key={`product--${product.id}`} >
                        <div>Name: {product.name}</div>
                        <div>Price: ${product.price.toFixed(2)}</div>
                        <div>Type: {productType?.category} </div>


                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                navigate(`/purchase/${product.id}/create`)
                            }}>Purchase</button>

                    </section>

                })
            }
        </article>
    </>
}
