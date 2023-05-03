const bcrypt = require('bcrypt')
const express = require('express')
const app = express()

app.use(express.json())

const { deleteUser, insertUser } = require('./db')

app.get('/welcome', function (req, res) {
    res.json({ message: 'Ola QAx' })
})

app.delete('/user/:email', async function (req, res) {

    const { email } = req.params
    await deleteUser(email)
    res.status(204).end()
})
//Criando usuario new
app.post('/user', async function (req, res) {
    console.log(req.body)

    const { name, email, password, is_shaver } = req.body

    const hashPass = await bcrypt.hash(password, 8)

    console.log(hashPass)

    res.status(200).end()


    // const user = {
    //  name: name,
    //  email: email,
    //   password: hashPass,
    //  is_shaver: is_shaver
    // }

    // console.log(user)

    // const id = await insertUser(user)

    // res.status(201).json({ user_id: id })
})

app.listen(5000)