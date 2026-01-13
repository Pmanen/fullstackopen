const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: {
    type: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
      },
      text: String
    }],
    default: []
  }
})

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    if (returnedObject.comments && returnedObject.comments.length) {
      returnedObject.comments = returnedObject.comments.map(comment => ({
        id: comment._id.toString(),
        text: comment.text
      }))
    }
  }
})

module.exports = mongoose.model('Blog', blogSchema)