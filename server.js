const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

let allNotes = require('./db/notes.json')

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
   newNote.id = Math.floor(Math.random()*100000000)
   allNotes.push(newNote)
//    allNotes = JSON.stringify(allNotes)
   fs.writeFile('./db/notes.json', JSON.stringify(allNotes), err => {
       if (err) throw err
       res.json("success")
   })
})

app.put('/api/notes/:id', (req, res) => {
    for (const note of allNotes) {
        if (note.id === req.params.id) {
            note.text = req.body.text
            note.title = req.body.title
            fs.writeFile('./db/notes.json', JSON.stringify(allNotes), err => {
                if (err) throw err
                res.json('success')
            })
        }
    }
    console.log(allNotes)
} )

app.delete('/api/notes/:id', (req, res) => {
    for (const note of allNotes) {
        if (note.id === req.params.id) {
                
        }
    }
})
    


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });