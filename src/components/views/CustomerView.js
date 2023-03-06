import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { PurchasesList } from "../purchases/PurchaseList"
import { PurchaseForm } from "../purchases/PurchaseForm"
import { ProductForm } from "../products/ProductForm"
import { ProductContainer } from "../products/ProductContainer"
import { Cart } from "../cart/Cart"


export const CustomerView = () => {

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <h2>Customer</h2>
                    <div>Get Your Candy Here!</div>

                    <Outlet />
                </>
            }>
                <Route path="locations" element={<LocationsList />} />

                <Route path="products" element={<ProductContainer />} />

                <Route path="product/create" element={<ProductForm />} />

                <Route path="purchases" element={<PurchasesList />} />

                <Route path="purchase/:productId/create/" element={<PurchaseForm />} />

                <Route path="cart" element={<Cart />} />



            </Route>
        </Routes>
    )
}