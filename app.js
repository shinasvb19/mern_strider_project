if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');


// const methodOverride = require('method-override');
const userRoutes = require('./routes/user-routes');
const adminRoutes = require('./routes/admin-routes');
const categoryRoutes = require('./routes/category-routes');
const subcategoryRoutes = require('./routes/subcategory-routes');
const productRoutes = require('./routes/productRoutes');
const brandRoutes = require('./routes/brandRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const cartRoutes = require('./routes/cartRoutes')
const checkoutRoutes = require('./routes/checkoutRoutes')
const bannerRoutes = require('./routes/bannerRoutes')
const couponRoutes = require('./routes/couponRoutes')
const wishlistRoutes = require('./routes/wishlistRoutes')
const dbconfiq = require('./confiq/dbConfiq');
const session = require('express-session');
const path = require('path')
const flash = require('connect-flash');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { application } = require('express');
const client = require('twilio')('AC1cb03b4848113ccde7f459d0df0df690', '21d29544528451e184aa6540657fd451');
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })
// const flash = require('connect-flash');

const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
dbconfiq();
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
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static('files'));

app.use((req,res,next)=>{
    res.locals.success =req.flash('success')
    res.locals.error =req.flash('error')
    next()
    })  


app.use((req, res, next) => {
    res.setHeader("Access-Contol-Allow-Orgin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
})

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout');
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/categorys', categoryRoutes);
app.use('/subcategorys', subcategoryRoutes);
app.use('/products', productRoutes);
app.use('/brand', brandRoutes);
app.use('/cart', cartRoutes);
app.use('/', dashboardRoutes);
app.use('/checkout',checkoutRoutes);
app.use('/banner', bannerRoutes);
app.use('/coupon',couponRoutes);
app.use('/wishlist', wishlistRoutes);


// app.get('/', (req, res) => {
//     res.render('layouts/layout')
// })
// app.post('/products', upload.single('image'), (req, res) => {

//     res.json({ status: "success" })
// })

app.get('*', (req, res, next) => {
    res.send("404, Not found").status(404);
})

app.listen(5000, () => {
    console.log('listening to port 5000 .💕❤️💕')
})
