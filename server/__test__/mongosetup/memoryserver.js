import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';


const mongoServer = new MongoMemoryServer();

mongoServer.getUri().then((mongoUri) => {
    const mongooseOpts = {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    };

    mongoose.connect(mongoUri, mongooseOpts);

    mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
            console.log(e);
            mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
    });

    mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
});

export default mongoServer