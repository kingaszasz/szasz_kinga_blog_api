const User = require('../model/user')

module.exports = {
  getUser: (req, res) => {
    res.json({
        user: req.user
    })
},


module.exports = {
    getUser: (req, res) => {
      res.json({
          user: req.user,
          success: `logged in: ${req.user}` 
      })
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
          })
      });
  },
  
  login: (req, res) => {
      res.json({
          success: 'successfull login' 
      })
  },
  
  logout: (req, res) => {
      req.logout();
      res.json({
          success: 'successfull logout' 
      })
  }
  
  }