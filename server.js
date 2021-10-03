const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

let oldNotes = require('./db/notes.json')

let allNotes = []

allNotes.push(oldNotes)

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

app.post('/api/notes', (req, res) => {
   let newNote = req.body
   allNotes.push(newNote)
   allNotes = JSON.stringify(allNotes)
   fs.writeFile('./db/notes.json', allNotes, err => {
       if (err) throw err
   })
})
    


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });