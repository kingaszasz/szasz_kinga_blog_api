const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

  // id-t automatikusan hozza lérte
 /* id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },*/

  tag: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Methods - ha akarnánk még hozzá adni metódusokat, akkor itt tehetjük meg
blogSchema.method({})

// Static Methods
blogSchema.static({})

module.exports = mongoose.model('Post', blogSchema)
