
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
        res.render('layouts/layout')
    }
    else {
        res.send('invalid username or passsword');
    }

}

exports.signin = signin;
exports.signinPage = signinPage;