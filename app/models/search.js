const mongoose = require('mongoose')

const searchSchema = new mongoose.Schema({
    term: String,
    when: Date
})

const Search = mongoose.model('Search', searchSchema)

module.exports = Search