const User = require('../model/user')

module.exports = {
    list: (req, res) => {
        User.find({}, (err, post) => {
            if (err) {
                res.send(err)
                console.log(err)
            }
            res.json(post)
        })
    },

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
            success: 'Belépve',
            userName: req.user.username,
            id: req.user._id
        });
    },

    logout: (req, res) => {
        req.logout(); //passport-local-mongoose
        res.json({
            success: 'successfull logout'
        })
    },

    // Delete a user with the specified userId in the request
    remove: (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, data) => {
            if (err) {
                res.send(err)
                console.log(err)
            } else {
                res.json(data)
            }
        })
    }

}