import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
import "./ProductList.css"

export const ProductsList = ({searchTermsState}) => {
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
        fetch(`http://localhost:8088/products`)
        .then(response => response.json())
        .then((productsArray) => {
            setProducts(productsArray)
            })
    },
    []
   )


   useEffect(
    () => {
        fetch(`http://localhost:8088/productTypes`)
        .then(response => response.json())
        .then((productTypesArray) => {
            setProductTypes(productTypesArray)
            })
    },
    [productTypes]
   )


//let sortedProducts = products.sort((p2, p1) => p1.name < p2.name ? 1 : (p1.name > p2.name) ? -1 : 0)
 
useEffect(() => {
        if (topProduct){
            const topProducts = products.filter(product => {
                return product.price > 2
            })
            setFilteredProducts(topProducts)
        }
        else {
            setFilteredProducts(products)
        }
    }, [products]
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
                    
                    </section>              
                
                })
                
            }
         
    </article>
    </>
        }