import configs from 'configs';
import connectMongo from './mongo';

export default async () => {
  if (configs.mongodb.host) {
    await connectMongo();
  }
};
