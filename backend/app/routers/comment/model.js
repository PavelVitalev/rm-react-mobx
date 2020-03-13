import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema(
    {
        taskId: String,
        email: String,
        name: String,
        comment: String,
    },
    {
        timestamps: true
    }
);

CommentSchema.methods.getData = function () {
  return {
    _id: this._id,
    taskId: this.taskId,
    email: this.email,
    name: this.name,
    comment: this.comment,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
