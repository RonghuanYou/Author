import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory} from 'react-router-dom'

import axios from 'axios'
import AuthorForm from './AuthorForm'

const Update = (props) => {
    // const { createAuthor } = props
    const { id } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [currentName, setCurrentName] = useState("") // to pre-populate the form
    const [currentAge, setCurrentAge] = useState(0)    // to pre-populate the form

    const [dbErrors, setDbErrors] = useState([])       // backend-validation 
    const [idError, setIdErrors] = useState("")        // unrecognized id error message
    const history = useHistory()                       // redirect to home page when updating succeeds

    // get specific author need to update, order matters
    useEffect(() => {
        axios.get("http://localhost:8000/" + id)
            .then(res => {
                setCurrentName(res.data.name)
                setCurrentAge(res.data.age)
                setLoaded(true)
            })
            .catch(err => {
                setIdErrors("We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?")
            })
    }, [id])


    // perform the action of updating author info when user submit update form
    const updateAuthor = (name, age) => {
        // send put request to update the instacnce in db
        axios.put(`http://localhost:8000/edit/${id}`, { name, age})
            .then(res => {
                console.log(res)
                history.push('/')
            })

            .catch(err => {
                const {errors} = err.response.data
                const messages = Object.keys(errors).map(att => errors[att].message)
                setDbErrors(messages)
            })
    }

    return (
        <div>
            <h1>Favorite authors</h1>
            <Link to="/">Home</Link>
            <p>Edit this author: </p>
            {/* if id is unrecognized, display error message and add an author link */}
            <p style={{ color: "red" }}>{idError}</p>
            {idError ?
                <Link to={'/new'}>
                    Add an author
                </Link> : ""
            }

            {loaded && <AuthorForm onSubmitProp={updateAuthor} dbErrors={dbErrors} 
                        initName={currentName} initAge={currentAge}
                        />}
        </div>
    )
}

export default Update
