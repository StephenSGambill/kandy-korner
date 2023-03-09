import { useState } from "react"
import { InventoryList } from "./InventoryList"
import { InventorySearch } from "./InventorySearch"

export const InventoryContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    
    return <>
    <InventorySearch setterFunction={setSearchTerms} />
    <InventoryList searchTermsState={searchTerms} />
    </>
}
