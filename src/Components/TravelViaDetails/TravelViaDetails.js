import React from 'react';
import './TravelViaDetails.css';
import peopleIcon from '../Photos/peopleicon.png';

const TravelViaDetails = (props) => {

    const {sit, price, image } = props.travelBy;
    return (
        <div className="details-box" >
            <div className="details">
                <img src={image} alt="" />
                <h6><img src={peopleIcon} alt=""/>{sit}</h6>
                <h6>{price}</h6>
            </div>
        </div>
    );
};

export default TravelViaDetails;