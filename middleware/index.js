module.exports = {

    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) {
            // User logged in
            next();
        } else {
            // User NOT logged in
            res.redirect('/auth/login');
        }
    }

}