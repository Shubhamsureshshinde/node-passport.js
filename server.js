const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const users = []
const initilizePassport = require('./passport-config')
const passport = require('passport')
initilizePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'shubham' })
})

app.get('/login', (req, res) => {
    res.render('login.ejs',)
})

app.get('/register', (req, res) => {
    res.render('register.ejs',)
})

app.post('/register', async (req, res) => {
    console.log(req, 'register form is workin')
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.name,
            password: hashedPassword,
        })
        res.redirect('/login')
    }
    catch (error) {
        console.log(error, "error")
        res.redirect('/register')

    }
    console.log(users)
})

// app.post('/login', (req, res) => {
//     console.log(req, res, 'lsdsld')
// })
app.listen(3000)
console.log('hiiiiiiiiiiiii')