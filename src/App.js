import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Destination from './Components/Destination/Destination';
import Header from './Components/Header/Header';
import Blog from './Components/Blog/Blog';

export const UserContext = createContext();
export const travelContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [travelVia, setTravelVia] = useState('');
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <travelContext.Provider value={[travelVia, setTravelVia]} >
          <Header></Header>
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/blog">
              <Blog></Blog>
            </Route>
            <PrivateRoute path="/destination">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="/login">
              <Login></Login>
            </Route>
          </Switch>
        </travelContext.Provider>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
