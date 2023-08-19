const express = require('express')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
const GoogleImages = require('google-images')

const config = require('../config')
const Search = require('./models/search')

mongoose.connect(config.mongoDBUri, {
    useMongoClient: true
})

const imageClient = new GoogleImages(config.cseId, config.apiKey)

const app = express()
app.use(express.static('public'));

app.get('/api/imagesearch/:term', (req, res) => {
    const term = req.params.term
    const options = {}

    if (req.query.offset)
        options.page = +req.query.offset

    imageClient.search(term, options)
        .then((images) => {
            const mapped = images.map((image) => {
                return {
                    url: image.url,
                    snippet: image.description,
                    thumbnail: image.thumbnail.url,
                    context: image.parentPage
                }
            })
            res.json(mapped)
        })

    Search.create({
        term: term,
        when: new Date()
    })
})



app.get('/api/latest/imagesearch', (req, res) => {
    Search.find({}, 'term when -_id')
        .sort('-when')
        .limit(10)
        .exec((err, searches) => {
            if (err) return;
            res.json(searches)
    })
})

module.exports = app