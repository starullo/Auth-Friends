import React, {useState, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './components/Login';
import FriendsList from './components/FriendsList';
import PrivateRoute from './components/PrivateRoute';
import Friend from './components/Friend';
import AddFriend from './components/AddFriend';

function App() {

  return (
    <Router>
      <div className="App">
        <header>
          <h1>FRIENDS LIST! wow</h1>
          <Link to='/login'>LOGIN</Link>
          <Link to='/'>HOME</Link>
          <Link to='/friends'>FRIENDS LIST!!!</Link>
        </header>
        <Switch>
          <PrivateRoute exact path='/friends' component={FriendsList}/>
          <PrivateRoute exact path='/addFriend' component={AddFriend}/>
          <Route path='/login' component={Login}/>
          <Route exact path='/'>
            <h2>WELCOME TO FRIENDSLIST! THE GREATEST WEBSITE IN THE HISTORY OF ALL THINGS. YOU CAN SEE YOUR FRIENDS, ADD A FRIEND, EDIT A FRIEND, OR EVEN DELETE A FRIEND! <Link to='/login'>CLICK HERE</Link> TO LOG IN!</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
