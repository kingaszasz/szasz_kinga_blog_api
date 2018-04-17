const blogController = require('../controller/blog-controller')
const express = require('express')
const blogRouter = express.Router()

blogRouter.route('/')
  .get(blogController.list)
  .post(blogController.create);

blogRouter.route('/:id')
  .get(blogController.find)
  .put(blogController.update)
  .delete(blogController.remove);

module.exports = blogRouter