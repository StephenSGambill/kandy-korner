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

