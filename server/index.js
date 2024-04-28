const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const friendModel = require('./models/friends')

const app = express();
app.use(express.json())
app.use(cors())


mongoose.connect('mongodb://localhost:27017/tutorial_mern');


app.post('/addfriend', async (req, res) => {

    const name = req.body.name 
    const age = req.body.age

    const friend = new friendModel({
        name: name,
        age: age
    })
    await friend.save()
    res.send(friend)
})

app.get('/read', async (req, res) => {
    friendModel.find({})
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send(err)
        })
})

app.put('/update', async (req, res) => {
    const newAge = req.body.newAge
    const newName = req.body.newName
    const id = req.body.id

    try {
        const friendToUpdate = await friendModel.findById(id)
        friendToUpdate.age = Number(newAge)
        friendToUpdate.name = String(newName)
        friendToUpdate.save()
    } catch (err){
        console.log(err)
    }

    res.send('updated')
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id

    await friendModel.findByIdAndDelete(id).exec()

    res.send('deleted')
})

app.listen(process.env.PORT || 3001, () => {
    console.log('you are connected')
});
