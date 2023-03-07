import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom"
import { getLocations } from "../ApiManager"
import "./Locations.css"

export const LocationsList = () => {
   const [locations, setLocations] = useState([])
   

   useEffect(
    () => {
        getLocations()
        .then((locationsArray) => {
            setLocations(locationsArray)
        })
    },
    []
   )



    return <>
    <h2>List of Locations</h2>

    <article className="locations" >
    {
    locations.map((location) => {
        return <section className="location" key={`location--${location.id}`}>
                <div>Store: {location.id}</div>
                <header>Address: {location.address}</header>
                <footer>Size: {location.squareFootage} sq. feet</footer>
            </section>
    }
    )
    }
    </article>
    </>

}