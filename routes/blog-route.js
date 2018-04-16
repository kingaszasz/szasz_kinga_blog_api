// a toDoList routere

const express = require('express');
const Blog = require('../controller/blog-controller');
const blogRouter = express.Router();

// GET localhost:3000/blog
blogRouter.get('/', function(req, res) {
    res.json(Blog.getAll());
  });


// GET localhost:3000/blog/:id
blogRouter.get('/:id', function(req, res) {
    res.json(Blog.getOne(req.params.id));
  });

// POST localhost:3000/blog
blogRouter.post('/', function(req, res) {
    res.json(Blog.addOne(req.body));
  });

// PUT localhost:3000/blog/:id
blogRouter.put('/:id', function(req, res) {
    res.json(Blog.editOne(req.params.id, req.body));
  });

// DELETE local host:3000/blog/:id
blogRouter.delete('/:id', function(req, res) {
  res.json(Blog.removeOne(req.params.id));
  });



module.exports = blogRouter;