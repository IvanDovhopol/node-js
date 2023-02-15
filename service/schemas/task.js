const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const task = new Schema(
  {
    title: {
      type: String,
      minlegth: 2,
      maxlength: 70,
    },
    text: {
      type: String,
      minlegth: 3,
      maxlength: 170,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = mongoose.model('task', task);
module.exports = Task;
