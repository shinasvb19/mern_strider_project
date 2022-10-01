
const bcrypt = require('bcrypt');


const signinPage = (req, res) => {
    res.render('admin/adminsignin')
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

exports.signin = signin;
exports.signinPage = signinPage;