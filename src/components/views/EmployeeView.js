import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { PurchasesList } from "../purchases/PurchaseList"
import { PurchaseForm } from "../purchases/PurchaseForm"
import { ProductsList } from "../products/ProductList"
import { ProductForm } from "../products/ProductForm"
import { EmployeeList } from "../employees/EmployeesList"


export const EmployeeView = () => {

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

        {/* <Route path="purchases" element={ <PurchasesList /> } /> */}

        <Route path="products" element={ <ProductsList /> } />

        {/* <Route path="purchases/create" element={ <PurchaseForm /> } /> */}

        <Route path="product/create" element={ <ProductForm /> } />

        <Route path="employees" element={ <EmployeeList />} />

        {/* <Route path="employees/:employeeId" element={ <EmployeeDetails />} */}


    </Route>
</Routes>
)}