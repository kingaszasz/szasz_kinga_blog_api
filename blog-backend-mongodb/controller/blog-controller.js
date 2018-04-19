const Blog = require('../model/blog-model')

//Blog. xy --> mongoose utasítások!
module.exports = {
  list: (req, res) => {
    Blog.find({}, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  },

  find: (req, res) => {
    Blog.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  },

  create: (req, res) => {
    Blog.create(req.body, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  },

  update: (req, res) => {
    req.body.updatedAt = new Date().toLocaleDateString();
    Blog.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  },

  remove: (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  }
}