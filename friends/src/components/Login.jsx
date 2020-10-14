import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const initialFormValues = {
    username: '',
    password: '',
}

const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const history = useHistory();
    console.log(history)

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post("http://localhost:5000/api/login", formValues)
        .then(res=>{
            window.localStorage.setItem('token', res.data.payload);
            history.push('/friends')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleChanges = e => {
        setFormValues({
            ...formValues, 
            [e.target.name]: e.target.value,
        })
    }
    return (
        <div>
            <h2>Here's the form!!!! Fill it out!!! Hurry up</h2>
            <form>
                <input
                type='text'
                name='username'
                value={formValues.username}
                onChange={handleChanges}
                />
                <input
                type='password'
                name='password'
                value={formValues.password}
                onChange={handleChanges}
                />
                <button onClick={handleSubmit}>LOG IN</button>
            </form>
        </div>
    )
}

export default Login
