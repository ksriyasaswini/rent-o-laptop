import React from 'react';
import './App.css';
import SignIn from './components/signin';
import SignUp from './components/signup';
import NavBar from './components/navbar';
import ForgotPassword from './components/forgot-password';
import Home from './components/home';
import Device from "./components/device"

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import UserProfile from './components/user-profile/user-profile';
import UserDevices from './components/user-devices/user-devices';
import UserBookings from './components/user-bookings/user-bookings';
import userDevice from './components/user-device/user-device';

class App extends React.Component{
  render(props){
     return(
        <Router>
           <NavBar/>
           <Switch>
              <Route exact path="/signin" component={SignIn}/> 
              <Route exact path="/signup" component={SignUp}/>
              <Route exact path="/forgot-password" component={ForgotPassword}/>
              <Route exact path="/home" component={Home}/>
              <Route exact path="/profile" component={UserProfile}/>
              <Route exact path="/device/:id" component={Device}/>
              <Route exact path="/user-devices" component={UserDevices}/>
              <Route exact path="/user-device" component={userDevice}/>
              <Route exact path="/user-bookings" component={UserBookings}/>

              <Redirect to="/home"/>
           </Switch> 
        </Router>
     );                                
  }
}
export default App;
