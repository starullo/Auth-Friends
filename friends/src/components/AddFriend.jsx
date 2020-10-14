import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {useHistory} from 'react-router-dom';

const initialFormValues = {
    name: '',
    age: '',
    email: ''
}

const AddFriend = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [friendsList, setFriendsList] = useState([]);

    const history = useHistory();

    useEffect(()=>{
        axiosWithAuth()
        .get('/friends')
        .then(res=>{
            setFriendsList(res.data);
        })
    }, [])

    const handleChange = e => {
        setFormValues({
            ...formValues, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/friends', {...formValues, id: friendsList.length + 1})
        .then(res=>{
            console.log(res)
            history.push('/friends')
        })
    }

    return (
        <div>
        <h1>ADD A FUCKING FRIEND</h1>
        <form>
            <label htmlFor='name'>NAME
                <input
                type='text'
                name='name'
                value={formValues.name}
                onChange={handleChange}
                />
            </label><br/>
            <label htmlFor='age'>AGE
                <input
                type='text'
                name='age'
                value={formValues.age}
                onChange={handleChange}
                />
            </label><br/>
            <label htmlFor='email'>EMAIL
                <input
                type='text'
                name='email'
                value={formValues.email}
                onChange={handleChange}
                />
            </label><br/>
            <button onClick={handleSubmit} >ADD FRIEND</button>
        </form>
        </div>
    )
}

export default AddFriend
