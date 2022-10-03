const express = require('express');

const mongoose = require('mongoose');
// const methodOverride = require('method-override');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');
const categoryRoutes = require('./routes/category-routes');
const session = require('express-session');
const path = require('path')
const flash = require('connect-flash');
// const flash = require('connect-flash');

const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
app.use(function (req, res, next) {
    res.set(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});

const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/strider",
    collection: 'sessionValues'
});
store.on('error', function (error) {
    console.log(error);
});
app.use(session({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('files'));


// app.use(flash());

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
app.set('layout', './layouts/layout');
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/categorys', categoryRoutes);
app.get('/', (req, res) => {
    res.render('layouts/layout')
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
