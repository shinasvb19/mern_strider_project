
const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema');


const signinPage = (req, res) => {

    res.render('admin/adminLogin', { message: req.flash('invalid') })
    // console.log(req.session.username);
}

const signin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
        const validPassword = await bcrypt.compare(password, admin.password);
        if (validPassword) {
            req.session.username = admin.username;
            res.redirect('/admin/dashboard');
        }
        else {
            req.flash('invalid', 'invalid username or password');
            res.redirect('/admin/signin');

        }
    }
    else {
        req.flash('invalid', 'invalid username or password');
        res.redirect('/admin/signin');
    }

}

const adminDashbord = (req, res) => {
    res.render('admin/admin')
}

const product = (req, res) => {
    res.render('admin/addProduct');
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/signin')
}

const sessionCheck = (req, res, next) => {
    if (req.session.username) {

        res.redirect('/admin/dashboard');
    } else {
        next();
    }
}

const sessionCheckDashboard = (req, res, next) => {
    if (req.session.username) {
        next();
    }
    else {
        res.redirect('/admin/signin')
    }

}
exports.sessionCheckDashboard = sessionCheckDashboard;
exports.sessionCheck = sessionCheck;
exports.product = product;
exports.signin = signin;
exports.signinPage = signinPage;
exports.adminDashbord = adminDashbord;
exports.logout = logout;