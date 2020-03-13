import mongoose, { Schema } from 'mongoose';

const BoardSchema = new Schema(
  {
    title: String,
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    columns: [{
      type: Schema.Types.ObjectId,
      ref: 'Column',
    }]
  },
  {
    timestamps: true
  }
);

BoardSchema.methods.getData = function () {
  return {
    _id: this._id,
    title: this.title,
    users: this.users,
    columns: this.columns,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const Board = mongoose.model('Board', BoardSchema);

export default Board;
