const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const cats = new Schema({
  nickname: {
    type: String,
    index: 1,
    minlength: 2,
    maxlength: 10,
    required: [true, 'Nickname is required'],
  },
  age: {
    type: Number,
    min: 1,
    max: 50,
  },
  owner: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    address: [String],
    birthday: Date,
  },
});

const Cat = mongoose.model('cat', cats);

const cat = new Cat({
  nickname: 'Barsik',
  age: 3,
  owner: {
    name: 'Ivan',
    email: 'lemon123@gmail.com',
  },
});

const result = cat.save();
const resultBetweenCreate = Cat.create({
  nickname: 'Barsik',
  age: 3,
  owner: {
    name: 'Ivan',
    email: 'lemon123@gmail.com',
  },
});

console.log('add cat in db', result);
