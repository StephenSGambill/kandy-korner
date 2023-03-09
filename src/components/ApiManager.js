export const getLocations = () => {
    return fetch(`http://localhost:8088/locations`)
        .then(response => response.json())
}

export const setNewUser = (user) => {
    return  fetch("http://localhost:8088/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
}

export const getUserEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
    .then(res => res.json())
}

export const getUserByEmail = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
}

export const getUserCustomer = (userObjectId) => {
    return fetch(`http://localhost:8088/customers?userId=${userObjectId}&_expand=user`)
            .then(response => response.json())
}

export const getCustomerInCart = (userObjectId) => {
    return fetch(`http://localhost:8088/purchases?customerId=${userObjectId}&inCart=true`)
    .then(response => response.json())
}

export const getProducts = () => {
    return fetch('http://localhost:8088/products')
            .then(response => response.json())
}

export const getCustomerUser = () => {
    return fetch(`http://localhost:8088/customers?_expand=user`)
    .then(response => response.json())
}

export const getCustomerByUserId = (customerId) => {
    return fetch(`http://localhost:8088/customers?userId=${customerId}`)
    .then((response) => response.json())
}

export const setCustomersByCustomerId = (customerId, customer) => {
    return fetch(`http://localhost:8088/customers/${customerId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"

        },
        //change string to JSON object
        body: JSON.stringify(customer)
    })
        .then(response => response.json())
}

export const setNewEmployeeUserInfo = (employeeInfoToSendToUserAPI) => {
    return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(employeeInfoToSendToUserAPI)
        })
            .then(response => response.json()) //figure out how to get a response of newly created object
}

export const setNewEmployeeEmployeeInfo = (employeeInfoToSendToEmployeeAPI) => {
    return fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeInfoToSendToEmployeeAPI)
                })
                    .then(response => response.json())
}

export const getEmployeeLocation = (id, userId) => {
    return fetch(`http://localhost:8088/employees?_expand=user&_expand=location`)
    .then(response => response.json())
}

export const deleteEmployeeUser = (id, userId) => {
    //couldn't get this one to work, created the problem that Derek and Tianna were working with me on
}

export const getProductTypes = () => {
    return fetch(`http://localhost:8088/productTypes`)
    .then(response => response.json())
}

export const setProduct = (productToSendToAPI) => {
    return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            //change string to JSON object
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
}

export const getProductById = (productId) => {
    return fetch(`http://localhost:8088/products/${productId}`)
                .then(response => response.json())
}

export const setPurchase = (newPurchase) => {
    return fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(newPurchase)
        })
            .then(response => response.json())
}

export const getCustomerUsers = (userObjectId) => {
    return fetch(`http://localhost:8088/users?id=${userObjectId}&_embed=customers`)
    .then(response => response.json())
}

export const getPurchasesbyCustomerId = (userObjectId) => {
    return  fetch(`http://localhost:8088/purchases?customerId=${userObjectId}`)
    .then(response => response.json())
}

export const getProductsAndTypes = () => {
    return fetch(`http://localhost:8088/products?_embed=productTypes`)
    .then(response => response.json())
}

export const getPurchases = () => {
    return fetch(`http://localhost:8088/purchases`)
    .then(response => response.json())
}
