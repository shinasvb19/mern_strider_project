
const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema');


const signinPage = (req, res) => {
    res.render('admin/adminsignin')
}

const signin = async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    const validPassword = await bcrypt.compare(password, admin.password);
    if (validPassword) {
        res.redirect('/admin/dashboard');
    }
    else {
        res.send('invalid username or passsword');
    }

}

const adminDashbord = (req, res) => {
    res.render('admin/admin')
}

exports.signin = signin;
exports.signinPage = signinPage;
exports.adminDashbord = adminDashbord;