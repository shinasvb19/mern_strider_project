const express = require('express');

const mongoose = require('mongoose');
// const methodOverride = require('method-override');
const userRoutes = require('./routes/user-routes');
const User = require('./models/userSchema');
// const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader("Access-Contol-Allow-Orgin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
})
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('signin')
})
app.post('/sample', (req, res) => {
    res.send(req.body)
})

app.get('*', (req, res, next) => {
    res.send("404, Not found").status(404);
})

mongoose.connect('mongodb://localhost:27017/strider', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        app.listen(5000, () => {
            console.log('listening to port 5000 .💕❤️💕')
        })
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })
