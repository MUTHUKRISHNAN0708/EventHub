import dotenv from 'dotenv';
import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

console.log('Attempting to connect to:', process.env.MONGO_URI);

try {
    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 60000,
        connectTimeoutMS: 60000,
    });
    console.log('CONNECTED SUCCESSFULLY');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    await mongoose.disconnect();
    console.log('DISCONNECTED');
    process.exit(0);
} catch (error) {
    console.error('CONNECTION FAILED:');
    console.error(error.message);
    process.exit(1);
}
