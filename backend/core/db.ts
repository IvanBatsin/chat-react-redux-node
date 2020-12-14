import mongoose from 'mongoose';

mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern_chat', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db
  .on('open', () => console.log('Connection is open'))
  .on('close', () => console.log('Connection is close'))
  .on('error', (error) => console.log(error));

export { db, mongoose };