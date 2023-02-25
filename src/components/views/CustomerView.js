import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { PurchasesList } from "../purchases/PurchaseList"
import { PurchaseForm } from "../purchases/PurchaseForm"
import { ProductsList } from "../products/ProductList"
import { ProductForm } from "../products/ProductForm"
import { ProductContainer } from "../products/ProductContainer"


export const CustomerView = () => {

return (
    <Routes>
        <Route path="/" element={
            <>
                <h1>
                    Kandy Korner
                </h1>
                <div>Get Your Candy Here!</div>

                <Outlet />
        </>
    }>
        <Route path="locations" element={ <LocationsList /> } />

        <Route path="purchases" element={ <PurchasesList /> } />

        <Route path="products" element={ <ProductContainer /> } />

        <Route path="purchases/create" element={ <PurchaseForm /> } />

        <Route path="product/create" element={ <ProductForm /> } />


    </Route>
</Routes>
)}