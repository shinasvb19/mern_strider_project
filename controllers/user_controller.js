const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const bcrypt = require('bcrypt');
const Product = require("../models/productSchema");
const signupPage = (req, res) => {

    res.render('usersignup')
}
const signup = async (req, res) => {
    const { username, firstName, lastName, mobile, email, password, user_type } = req.body;

    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        firstName,
        lastName,
        mobile,
        email,
        user_type,
        password: hash
    })
    try {
        await user.save()

    } catch (error) {
        console.log(error)
    }
    res.redirect('/users/signin');
}

const signinPage = (req, res) => {
    res.render('signin')
}

const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        req.session.username = user.username;
        req.session.user_type = user.user_type;
        req.session.user_id = user._id;

        res.redirect('/')
    }
    else {
        res.flash('invalid', 'invalid user name or password');
    }

}

exports.signupPage = signupPage;
exports.signup = signup;
exports.signinPage = signinPage;
exports.signin = signin;
