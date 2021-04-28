import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Destination.css';
import { fakeData } from '../FakeData/FakeData';
import { travelContext } from '../../App';
import TravelViaDetails from '../TravelViaDetails/TravelViaDetails';
import map from '../Photos/Map.png';



const Destination = () => {
    const [travels, setTravels] = useState([]);
    const [travelVia, setTravelVia] = useContext(travelContext);
    useEffect(() => {
        setTravels(fakeData)
    }, [])

    const sameTravelVia = travels.filter(travel => travel.travel_via === travelVia)
    
    const [destination, setDestination] = useState({})
    const {travelFrom , travelTo} = destination;

    const handleChange = (e) => {
        const newDestination = {...destination};
        newDestination[e.target.name] = e.target.value;
        setDestination(newDestination);

    }

    const searchVehicles = () => {
        document.getElementById("inputForm").style.display = "none";
        document.getElementById("travelDetails").style.display = 'block';
    }

    return (
        <div className="destination-container">
            <div className="select-location">
                <div id="inputForm" className="form-part">
                    <div className="travel-from">
                        <p>Travel From</p>
                        <input name='travelFrom' onBlur={handleChange} id="traveFrom" type="text" placeholder="Type Here" />
                    </div>
                    <div className="travel-to">
                        <p>Travel To</p>
                        <input name='travelTo' onBlur={handleChange} id="traveTo" type="text" placeholder="Type Here" />
                    </div>
                    <button onClick={searchVehicles} type="button" className="search-button" class="btn btn-warning">Search</button>
                </div>
                <div id="travelDetails" style={{display:'none'}} className="">
                    <div className="travel-location">
                        <p>{travelFrom}</p>
                        <p>To</p>
                        <p>{travelTo}</p>
                    </div>
                    {
                        sameTravelVia.map(travelBy => <TravelViaDetails travelBy={travelBy} ></TravelViaDetails> )
                    }
                </div>
            </div>
            <div className="map-part">
                <img src={map} alt=""/>
            </div>
        </div>
    );
};

export default Destination;