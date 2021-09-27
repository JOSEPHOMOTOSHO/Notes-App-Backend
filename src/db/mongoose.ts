import mongoose from 'mongoose';

const connectionURL = 'mongodb://127.0.0.1:27017/sso-fb';

export const run = async () => {
  await mongoose.connect(connectionURL)
  .then(() => console.log('Connected'))
  .catch(() => console.log('Not Connected'));
}

