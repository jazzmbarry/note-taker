const express = require('express')
const path = require('path')

const app = express()
const PORT = 3001

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./db/notes.json"))
})

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });