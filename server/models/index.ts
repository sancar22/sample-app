import { connect, Mongoose, ConnectOptions } from 'mongoose';

export const bootDB = async (
  connectionString: string
): Promise<Mongoose | undefined> => {
  try {
    const connection = await connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log('Successfully connected to the database.');
    return connection;
  } catch (err) {
    console.log('[Database connection error]:\n', err);
  }
};
