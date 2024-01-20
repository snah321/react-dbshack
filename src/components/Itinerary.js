import {useState, useEffect} from "react"
import { FaTimes } from 'react-icons/fa'
import Destinations from "./Destinations"
import Headerafter from "./Headerafter"

const Itinerary = () => {
    const [countryList, setCountryList] = useState([
        "Singapore"
    ])
    const [destinationList, setDestinationList] = useState([
        "A", "B", "Ced"
    ])
    const [country, setCountry] = useState('')
    const [budget, setBudget] = useState(0)
    const [title, setTitle] = useState('')
    const [destination, setDestination] = useState([])
    const [showError, setShowError] = useState(false)
    const [showAdded, setShowAdded] = useState(false)

    // Fetch Country
    
    // Fetch Destinations

    // Add Itinerary
    const onSubmit = (e) => {
        e.preventDefault()
        if (!country || !budget || !title || destination.length == 0) {
            setShowError(true)
            setTimeout(() => setShowError(false), 2000)
            console.log(showError)
        }

        else {
            const addItenerary = async (itineraryToAdd) => {
                const res = fetch("http://localhost:3001/api/itineraries/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(itineraryToAdd)
                })
            }
    
            addItenerary({country: 1, budget, title, destination})
            setShowAdded(true)
            setTimeout(() => setShowAdded(false), 2000)
        }   
    
    }

    // Delete Destination 
    const onDelete = (destinationToDelete) => {
        console.log('iii')
        setDestination(destination.filter((d) => d!=destinationToDelete))
    }


  return (
    <form>
        {/* <Headerafter/> */}
        <div className="form-control" >
            <h1>
                My Itinerary
            </h1>
            <div className="form-control">
                <label>Country</label>
                    <select className="drop-down" onChange={(e) => setCountry(e.target.value)}>
                        <option >Select Country</option>
                        {countryList.map((country) => (
                            <option key={country} value={country}> {country}</option>
                        ))}
                    </select>
            </div>
        </div>

        <div className="form-control">
            <div className="form-control">
                <label>Budget</label>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)}/>
            </div>
        </div>

        <div className="form-control">
            <div className="form-control">
                <label>Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
        </div>

        <div className="form-control">
            <div className="form-control">
                <label>Destinations</label>
                <select className="drop-down" onChange={(e) => {
                    ! destination.includes(e.target.value) &&
                    setDestination([...destination,e.target.value])
                }
                    }>
                    <option >Select Destinations</option>
                    {destinationList.map((destination) => (
                    <option key={destination} value={destination}>{destination}</option>))}
                </select>
            </div>
        </div>

        <div className="form-control">
            <Destinations destinationsSelected={destination} onDelete={onDelete}/>
        </div>

        { showError && <p className="error">Please fill in the form</p>}
        { showAdded && <p className="added">Added</p>}

        <input className="btn" type="submit" value="Add" onClick={onSubmit} ></input>

    </form>
  )
}

export default Itinerary