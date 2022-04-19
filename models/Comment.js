// Comment modeland ReplySchema model import
const { Schema, model, Types } = require('mongoose');
// dateFormat() import
const dateFormat = require('../utils/dateFormat');

// ReplySchema subdocument array for comments (replies)
const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment's _id field
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String
    },
    writtenBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// Comment model
const CommentSchema = new Schema({
  writtenBy: {
    type: String
  },
  commentBody: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  // associating the replies with comments
  replies: [ReplySchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// get total count of comments and replies on retrieval
CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;