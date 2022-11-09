const sessionCheckDashboard = (req, res, next) => {
   
    if (req.session.adminId) {
        next();
    }
    else {
        res.redirect('/admin/signin')
    }

}
exports.sessionCheckDashboard = sessionCheckDashboard;
const sessionCheck = (req, res, next) => {
    if (req.session.adminId) {

        res.redirect('/admin/dashboard');
    } else {
        next();
    }
}
exports.sessionCheck = sessionCheck;

const sessionCheckUser = (req, res, next) => {
    if (req.session.user_id) {
        next();
    }
    else {
        res.redirect('/users/signin')
    }

}
exports.sessionCheckUser = sessionCheckUser;

const sessionCheckSign = (req, res, next) => {
    if (req.session.user_id)  {

        res.redirect('/');
    } else {
        next();
    }
}
exports.sessionCheckSign = sessionCheckSign;