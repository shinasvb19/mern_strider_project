const User = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const bcrypt = require('bcrypt');
const Product = require("../models/productSchema");
const mongoose = require('mongoose');
const { findByIdAndUpdate } = require("../models/userSchema");
const { required } = require("joi");
const swal = require('sweetalert')
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
const profile = async (req,res)=>{
    const session= req.session.username
    let sessionId= req.session.user_id
//    sessionId = mongoose.Types.ObjectId(sessionId);
   const userDetails = await User.findById(sessionId)
   console.log(userDetails)
    res.render('user/userProfile',{session,userDetails})
}
const profilePut = async (req,res)=>{
     const id = req.session.user_id
     const username = req.session.username
     const {firstName, lastName , mobile ,email} = req.body
     const address = {country:req.body.country, address_line:req.body.address_line, town:req.body.town, 
        state:req.body.state,post_code:req.body.post_code}
     const update = await User.findByIdAndUpdate(id,{firstName, lastName,mobile,email,username,address}
     )
    // res.redirect('/')
    }
      
    

exports.profilePut = profilePut;
exports.profile = profile;
exports.signupPage = signupPage;
exports.signup = signup;
exports.signinPage = signinPage;
exports.signin = signin;
