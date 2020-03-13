import mongoose, { Schema } from 'mongoose';

const ColumnSchema = new Schema(
  {
    title: String,
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }]
  },
  {
    timestamps: true
  }
);

ColumnSchema.methods.getData = function () {
  return {
    _id: this._id,
    title: this.title,
    tasts: this.tasts,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const Column = mongoose.model('Column', ColumnSchema);

export default Column;
