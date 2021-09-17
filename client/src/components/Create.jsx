import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import AuthorForm from './AuthorForm'

const Create = () => {
    const [dbErrors, setDbErrors] = useState([])   // backend-validation
    const history = useHistory()
    
    // CREATING A AUTHOR IN DB
    const createAuthor = (name, age) => {
        axios.post("http://localhost:8000/new", { name, age })
            .then(res => {
                // create author successfully, redirect to main page
                history.push('/')
            })
            .catch(err => {
                const { errors } = err.response.data
                const messages = Object.keys(errors).map(att => errors[att].message)
                setDbErrors(messages)
            })
    }

    return (
        <div>
            <h1>Favorite authors</h1>
            <Link to="/">Home</Link>
            <p>Add a new author: </p>
            <AuthorForm onSubmitProp={createAuthor} dbErrors={dbErrors} initName="" initAge={0}/>
        </div>
    )
}

export default Create
