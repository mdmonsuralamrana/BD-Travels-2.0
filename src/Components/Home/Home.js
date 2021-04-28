import React, { useContext } from 'react';
import './Home.css';
import bike from '../Photos/Frame.png';
import car from '../Photos/Frame-2.png';
import bus from '../Photos/Frame-1.png';
import train from '../Photos/Group.png';
import { Link } from 'react-router-dom';
import { travelContext } from '../../App';


const Home = () => {
    const [travelVia, setTravelVia] = useContext(travelContext);
    return (
        <div className="home-page" >
            <div className='travel-system'>
                <Link onClick={() => setTravelVia('bike')} to='/destination' className="travel-via">
                    <img src={bike} alt="" />
                    <br/>
                    <h4>Bike</h4>
                </Link>
                <Link onClick={() => setTravelVia('car')} to='/destination' className="travel-via">
                    <img src={car} alt="" />
                    <h4>Car</h4>
                </Link>
                <Link onClick={() => setTravelVia('bus')} to='/destination' className="travel-via">
                    <img src={bus} alt="" />
                    <h4>Bus</h4>
                </Link>
                <Link onClick={() => setTravelVia('train')} to='/destination' className="travel-via">
                    <img src={train} alt="" />
                    <h4>Train</h4>
                </Link>
            </div>
        </div>
    );
};

export default Home;