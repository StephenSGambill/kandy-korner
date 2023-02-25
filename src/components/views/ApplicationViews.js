import {Routes, Route, Outlet} from "react-router-dom"
import {PurchasesList} from "../purchases/PurchaseList"
import {PurchaseForm} from "../purchases/PurchaseForm"
import {LocationsList} from "../locations/LocationsList"
import {ProductsList} from "../products/ProductList"
import { ProductForm } from "../products/ProductForm"
import { EmployeeView } from "./EmployeeView"
import { CustomerView } from "./CustomerView"


export const ApplicationViews = () => {
	
	const localUser = localStorage.getItem("kandy_user")
   	const userObject = JSON.parse(localUser)

	if (userObject.staff)
	{
		return <EmployeeView />

	} else {
		return <CustomerView />

	}
	
	
}

