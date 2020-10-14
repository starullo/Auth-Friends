import React, {useState, useEffect} from 'react';
import {Link, useRouteMatch, Route} from 'react-router-dom';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import Friend from './Friend';

const FriendsList = (props) => {
    const [friendsList, setFriendsList] = useState([]);

    useEffect(()=>{
      axiosWithAuth()
      .get('/friends')
      .then(res => {
          console.log(res)
          setFriendsList(res.data)
      })
      .catch(err => {
          console.log(err)
      })
  }, [])

    const {url} = useRouteMatch();


    return (
        <div>
            <h2>Your friends are...</h2>
                {friendsList.map(friend=>{
                    return (
                        <Friend key={Math.random() * 100000}data={friend} friendsList={friendsList} setFriendsList={setFriendsList}/>
                    )
                })}
            <Link to='/addFriend'>ADD A FUCKING FRIEND</Link>
        </div>
    )
}

export default FriendsList
