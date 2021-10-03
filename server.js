const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3001

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./notes.html"))
})

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/notes.json', {encoding: 'utf8'}, (err, data) => {
        if (err) {
            throw err
        }
        res.json(JSON.parse(data))
    })
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });