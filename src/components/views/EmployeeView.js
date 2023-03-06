import { Outlet, Route, Routes } from "react-router-dom"
import { LocationsList } from "../locations/LocationsList"
import { ProductsList } from "../products/ProductList"
import { ProductForm } from "../products/ProductForm"
import { EmployeeList } from "../employees/EmployeesList"
import { EmployeeHireForm } from "../employees/EmployeeHireForm"
import { CustomerList } from "../customers/CustomerList"
import { CustomerLoyaltyChange } from "../customers/CustomerLoyaltyChange"
import { Employee } from "../employees/Employee"

export const EmployeeView = () => {

return (
    <Routes>
        <Route path="/" element={
            <>
                <h1>Kandy Korner</h1>
                <h2>Employee</h2>
                <div>Get Your Candy Here!</div>
            
                <Outlet />
        </>
    }>
        <Route path="locations" element={ <LocationsList /> } />

        <Route path="products" element={ <ProductsList /> } />

        <Route path="product/create" element={ <ProductForm /> } />

        <Route path="employees" element={ <EmployeeList />} />

        <Route path="employees/create" element={ <EmployeeHireForm />} />

        <Route path="customers" element={ <CustomerList />} />

        <Route path="customers/:customerId" element={<CustomerLoyaltyChange />} />
   
    </Route>
</Routes>
)}