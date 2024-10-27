import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Module-level cache for the Mongoose connection
let cached: MongooseConnection = {
    conn: null,
    promise: null
};

export const connectToDatabase = async (): Promise<Mongoose> => {
    // Return the cached connection if available
    if (cached.conn) return cached.conn;

    // Throw an error if the connection URL is missing
    if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

    // Create a new connection if there's no cached promise
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: 'imaginify',
            bufferCommands: false,
        });
    }

    // Await the promise and store the connection in the cache
    cached.conn = await cached.promise;
    return cached.conn;
};
