import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser)
    return (
        <div className="header">
            <nav class="navbar navbar-expand-lg navbar-black bg-black d-grid gap-2 d-md-flex justify-content-md-end" >
                <ul >
                    <Link to="/home">Home</Link>
                    <Link to="/destination">Destination</Link>
                    <Link to="/contact">Contact Us</Link>
                    <Link to="/blog">Blog</Link>
                    {
                        loggedInUser.displayName ? <Link>{loggedInUser.displayName}</Link> : <Link type="button" className="btn btn-warning" to="/login">login</Link>
                    }
                </ul>
            </nav>
        </div>
    );
};

export default Header;