import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const FollowStatus = () => {
    const classes = useStyles();
    const [authors, setAuthors] = useState([])
    // const [followingStatus, setFollowingStatus] = useState([0, 0, 0])


    // GET ALL AUTHORS FROM SERVER
    useEffect(() => {
        axios.get("http://localhost:8000/")
            .then(res => {
                setAuthors(res.data.allAuthors);
            })
            .catch(err => {
                console.error(err)
            })
    }, []);


    // perform the action of updating author info when user submit update form
    const updateAuthor = (author_id, followingStatus) => {
        // send put request to update the instacnce in db
        axios.put(`http://localhost:8000/edit/${author_id}`, { followingStatus })
            .then(res => {
                console.log(res)
                
                axios.get("http://localhost:8000/")
                    .then(res => {
                        setAuthors(res.data.allAuthors);
                    })
                    .catch(err => {
                        console.error(err)
                    })
            })

            .catch(err => {
                console.log(err)
                // const { errors } = err.response.data
                // const messages = Object.keys(errors).map(att => errors[att].message)
                // setDbErrors(messages)
            })
    }

    return (
        <div>
            <h1>Following Status</h1>
            {/* display all favorite authors */}
            {/* for each author, there are three status: following, not following, undeided */}
            {JSON.stringify(authors)}
            <Table className={classes.table} aria-label="simple table">
                <tbody>
                    <tr>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>

                    {authors.map((author, idx) =>
                        <tr key={idx}>
                            {/* {JSON.stringify(author)} <br/> */}
                            <td style={{ color: "rebeccapurple" }}>{author.name}</td>
                            <td>
                                <button onClick={() => updateAuthor(author._id, [1, 0, 0])}
                                    style={{
                                        backgroundColor: author.followingStatus[0] === 1? "green" : "",
                                        color: author.followingStatus[0] ? "white" : "",
                                        margin: 10
                                    }}> Following
                                </button>

                                <button onClick={() => updateAuthor(author._id, [0, -1, 0])}
                                    style={{
                                        backgroundColor: author.followingStatus[1] === -1 ? "red" : "",
                                        color: author.followingStatus[1]? "white" : "",
                                        margin: 10
                                    }}> Not Following
                                </button>

                                <button onClick={() => updateAuthor(author._id, [0, 0, 2])}
                                    style={{
                                        backgroundColor: author.followingStatus[2] === 2 ? "orange" : "",
                                        color: author.followingStatus[2]? "white" : ""
                                    }}> Undecided
                                </button>  
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>


        </div>
    )
}

export default FollowStatus
