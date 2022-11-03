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