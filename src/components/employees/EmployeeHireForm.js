import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"



export const EmployeeHireForm = () => {
    const [locations, updateLocations] = useState([])
    const [newEmployee, setNewEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        payRate: 0,
        startDate: "",
        location: null
    })
    let newEmployeeId = 0
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationsArray) => {
                    updateLocations(locationsArray)
                })
        },
        []//dependency array (empty array runs essentially one time; if filled out, every time state changes on this item, rerun this useEffect)
        //cannot use with something inside useEffect, or causes infinite loop
    )


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const employeeInfoToSendToUserAPI = {
            firstName: newEmployee.firstName,
            lastName: newEmployee.lastName,
            email: newEmployee.email,
            isStaff: true
        }

        const employeeInfoToSendToEmployeeAPI = {
            startDate: newEmployee.startDate,
            payRate: newEmployee.payRate,
            locationId: newEmployee.locationId
        }


        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employeeInfoToSendToUserAPI)
        })
            .then(response => response.json()) //figure out how to get a response of newly created object

            .then(newEmployeeFromAPI => {
                employeeInfoToSendToEmployeeAPI.userId = parseInt(newEmployeeFromAPI.id)

                fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeInfoToSendToEmployeeAPI)
                })
                    .then(response => response.json())

                    .then(() => {
                        navigate(`/employees`)
                    })
            })
    }




    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee Form</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">First Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="First Name?"
                        value={newEmployee.firstName}
                        onChange={
                            (evt) => {
                                const copy = { ...newEmployee }
                                copy.firstName = evt.target.value
                                setNewEmployee(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Last Name:</label>
                    <input

                        type="text"
                        className="form-control"
                        placeholder="Last Name?"
                        value={newEmployee.lastName}
                        onChange={
                            (evt) => {
                                const copy = { ...newEmployee }
                                copy.lastName = evt.target.value
                                setNewEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        placeholder="Email?"
                        value={newEmployee.email}
                        onChange={
                            (evt) => {
                                const copy = { ...newEmployee }
                                copy.email = evt.target.value
                                setNewEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay Rate?:</label>
                    <input
                        type="text"
                        placeholder="Pay rate?"
                        value={newEmployee.payRate}
                        onChange={
                            (evt) => {
                                const copy = { ...newEmployee }
                                copy.payRate = parseInt(evt.target.value)
                                setNewEmployee(copy)

                            }
                        } />
                </div>

            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start date?:</label>
                    <input
                        type="date"
                        placeholder="Start date?"
                        value={newEmployee.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...newEmployee }
                                copy.startDate = evt.target.value
                                setNewEmployee(copy)
                            }
                        } />
                </div>

            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="location" >Location?:</label>
                    <select
                        className="location"
                        onChange={
                            (evt) => {
                                const copy = { ...newEmployee }
                                copy.locationId = parseInt(evt.target.value)
                                setNewEmployee(copy)
                            }}>
                        <option id="">Choose a location</option>
                        {locations.map((location) => {
                            return <option value={location.id} key={location.id}>{location.address}</option>
                        })
                        }
                    </select>
                </div>
            </fieldset>


            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit New Employee
            </button>
        </form>
    )
}