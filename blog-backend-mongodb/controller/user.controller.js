const User = require('../model/user')

module.exports = {
    getUser: (req, res) => {
        if (req.user) {

            if (req.user) {
                 res.json({
                user: req.user,
                success: `logged in as ${req.user.username}`
            })
            } else res.json({
                user: req.user
            })
        }
    },

    register: (req, res, next) => {
        User.register(new User({
            username: req.body.username,
            email: req.body.email,
        }), req.body.password, (err) => {
            if (err) {
                res.json({
                    error: err
                })
            }
            res.json({
                success: 'successfull registration'

            });
            res.redirect('/wellcome');
        });
    },

    login: (req, res) => {
        res.json({
            success: 'successfull login'
        })
    },

    logout: (req, res) => {
        req.logout(); //passport-local-mongoose
        res.json({
            success: 'successfull logout'
        })
    }

}