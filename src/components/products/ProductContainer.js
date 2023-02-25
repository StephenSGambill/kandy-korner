import { useState } from "react"
import { ProductSearch } from "./ProductSearch"
import { ProductsList } from "./ProductList"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    
    return <>
    <ProductSearch setterFunction={setSearchTerms} />
    <ProductsList searchTermsState={searchTerms} />
    </>
}
