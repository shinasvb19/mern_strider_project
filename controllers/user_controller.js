const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const bcrypt = require('bcrypt');
const signupPage = (req, res) => {
    res.render('usersignup')
}
const signup = async (req, res) => {
    const { username, firstName, lastName, mobile, email, password } = req.body;

    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        firstName,
        lastName,
        mobile,
        email,
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
        res.render('layouts/layout')
    }
    else {
        res.send('invalid username or passsword');
    }

}

exports.signupPage = signupPage;
exports.signup = signup;
exports.signinPage = signinPage;
exports.signin = signin;
