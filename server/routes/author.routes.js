const { createAuthor, getAllAuthors, getAuthor, updateAuthor, deleteAuthor} = require("../controllers/author.controller")

module.exports = function (app) {
    // todo: add api in route
    // GET ALL
    app.get('/', getAllAuthors)

    // CREATE
    app.post('/new', createAuthor)

    // GET ONE
    app.get('/:id', getAuthor)

    // UPDATE
    app.put('/edit/:id', updateAuthor)

    // DELETE
    app.delete('/:id', deleteAuthor)
}