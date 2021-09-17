const { Author } = require('../models/author.model')
module.exports = {
    // CREATE
    createAuthor: (req, res) => {
        Author.create(req.body)
            .then(newAuthor => res.json({ author: newAuthor }))
            .catch(err => res.status(400).json(err));
    },

    // GET ALL 
    getAllAuthors: (req, res) => {
        Author.find().sort({ name: 'asc' })
            .then(allAuthors => res.json({ allAuthors: allAuthors }))
            .catch(err => res.json(err));
    },

    // GET ONE: IF ID IS WRONG, SHOW ERROR MESSAGES
    getAuthor: (req, res) => {
        Author.findById(req.params.id)
            .then(oneAuthor => res.json(oneAuthor))
            .catch(err => res.status(400).json(err));
    },

    // UPDATE BY ID
    updateAuthor: (req, res) => {
        Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then(result => res.json({ result: result }))
            .catch(err => res.status(400).json(err));
    },

    // DELETE BY ID
    deleteAuthor: (req, res) => {
        Author.findByIdAndDelete(req.params.id)
            .then(result => res.json({ result: result }))
            .catch(err => res.json(err))
    }
}