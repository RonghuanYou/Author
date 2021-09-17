import React, { useState } from 'react'
import {Link} from 'react-router-dom'
// import { Button, FormControl, InputLable } from '@material-ui/core'

const AuthorForm = (props) => {
    const { onSubmitProp, dbErrors, initName, initAge} = props
    const [name, setName] = useState(initName)
    const [age, setAge] = useState(initAge)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        !age ? onSubmitProp(name, 0) :
        onSubmitProp(name, age) // create/update

        setName("")
        setAge(0)
    }

    return (
        <div>
            {dbErrors.map((error, idx) => <p key={idx} style={{ color: "red" }}> {error} </p>)}
            <form onSubmit={onSubmitHandler}>
                <p style={{ margin: 10}}>
                    <label style={{ margin: 5 }}>Name: </label>
                    <input onChange={e => setName(e.target.value)} type="text" value={name}/>
                </p>
                <p style={{ margin: 10 }}>
                    <label style={{ margin: 5 }}>Age: </label>
                    <input onChange={e => setAge(e.target.value)} type="text" value={age} />
                </p>
                <br/>

                <Link to="/" style={{ margin: 10, textDecoration: "none" }}>Cancel</Link>
                {/* KEEP SUBMIT BUTTON DISABLED UNTIL VALIDATIONS PASS */}
                {
                    name.length >=3 ? 
                    <button variant="contained" size="small" color="text.primary" >Submit</button> :
                    <button variant="contained" size="small" color="text.primary" disabled>Submit</button>
                }
            </form>
        </div>
    )
}

export default AuthorForm
