import React, {useState, useEffect} from 'react';
import {useParams, useRouteMatch, useHistory} from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import styled from 'styled-components';


const Div = styled.div`
    border: solid black 2px;
    margin: 2% auto;
    text-align: center;
`

const initialFormValues = {
    name: '',
    age: '',
    email: ''
}
const Friend = (props) => {
    const [styling, setStyling] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);
    
    const history = useHistory();
    

    const handleSubmit = e => {
        e.preventDefault();
        const newName = formValues.name ? formValues.name : props.data.name;
        const newAge = formValues.age ? formValues.age : props.data.age;
        const newEmail = formValues.email ? formValues.email : props.data.email;
        
        let editedObj = {
            name: newName,
            age: newAge,
            email: newEmail,
        }
        axiosWithAuth()
        .put(`/friends/${props.data.id}`, editedObj)
        .then(res=>{
            props.setFriendsList(res.data);
            setStyling(false)
        })
    }

    const deleteFriend = e => {
        console.log(props.data.id)
        axiosWithAuth()
        .delete(`/friends/${props.data.id}`)
        .then(res=>{
            props.setFriendsList(res.data)
            setStyling(false)
        })
    }

    const handleChange = e => {
        setFormValues({
            ...formValues, 
            [e.target.name]: e.target.value
        })
    }

    return (
        <Div>
            <p>Name: {props.data.name}</p>
            <p>Age: {props.data.age}</p>
            <p>Email: {props.data.email}</p>
            {!styling ? <button style={{margin: '2% auto'}}onClick={()=>setStyling(true)}>EDIT FRIEND</button> : <><button style={{margin: '2% 2%'}} onClick={handleSubmit}>SUBMIT CHANGES</button><button onClick={() => {
                setStyling(false)
            }} style={{margin: '2% 2%'}}>CANCEL</button><button onClick={deleteFriend} style={{margin: '2% 2%'}}>DELETE FRIEND</button></>}
            {styling && <form>
                <label htmlFor='name'>CHANGE NAME?
                    <input
                    type='text'
                    name='name'
                    value={formValues.name}
                    onChange={handleChange}
                    />
                </label><br/>
                <label htmlFor='age'>CHANGE AGE?
                    <input
                    type='text'
                    name='age'
                    value={formValues.age}
                    onChange={handleChange}
                    />
                </label><br/>
                <label htmlFor='email'>CHANGE EMAIL?
                    <input
                    type='text'
                    name='email'
                    value={formValues.email}
                    onChange={handleChange}
                    />
                </label>
                </form>}
        </Div>
    )
}

export default Friend
