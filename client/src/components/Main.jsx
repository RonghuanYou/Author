import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'; 
import { Button, Table} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Main = (props) => {
    const classes = useStyles();
    const [authors, setAuthors] = useState([])

    // GET ALL AUTHORS FROM SERVER
    useEffect(() => {
        axios.get("http://localhost:8000/")
            .then(res => {
                // console.log(res.data.allAuthors);
                // [{ "_id": "61425cde004553c9368c59c2", "name": "Bill Bryson", "createdAt": "2021-09-15T20:51:42.407Z", "updatedAt": "2021-09-15T20:51:42.407Z", "__v": 0 }]
                setAuthors(res.data.allAuthors);
            })
            .catch(err => {
                console.error(err)
            })
    }, []);


    // DELETE ONE INSTANCE FROM DB
    const deleteAuthor = (delete_id, deleteName) => {
        if (window.confirm(`Are you sure you want to remove ${deleteName}?`)) {
            axios.delete('http://localhost:8000/' + delete_id)
                .then( res => {
                    console.log(res.data)
                    // remove author from DOM after success
                    setAuthors(authors.filter(author => author._id !== delete_id))
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <div>
            <h1>Favorite authors</h1>
            <Link to={'/new'}>
                Add an author
            </Link> |

            <Link to={'/status/follow'}>
                Manage Follow Status
            </Link> 

            <p>We have quotes by:</p>
            <Table className={classes.table} aria-label="simple table">
                <tbody>
                    <tr>
                        <th>Author</th>
                        <th>Actions avaliable</th>
                    </tr>

                    {authors.map((author, idx) =>
                        <tr key={idx}>
                            <td style={{ color: "purple" }}>{author.name}</td>
                            <td>
                                <Button variant="containded" color="primary" size="small" >
                                    <Link to={`/edit/${author._id}`} style={{ textDecoration: "none", color: 'black' }}> Edit </Link>
                                </Button>
                                
                                <Button variant="containded" color="primary" size="small"
                                    onClick={e => { deleteAuthor(author._id, author.name)} }>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )}          
                </tbody>
            </Table>

        </div>
    )
}

export default Main
