import supertest from 'supertest';
import mongoose from 'mongoose';
import 'regenerator-runtime/runtime'

import app from '../app'
import mongoServer from './mongosetup/memoryserver';
import { iphoneSchema } from '../src/model/mongooseModel';
import { insertDb } from './dummyData';

const router = supertest(app)

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;


beforeAll(async () => {
    await mongoServer
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('DB and API test', () => {
    test('test if phone database got created and checked', async () => {
        const phone = mongoose.model('phone', iphoneSchema);
        const count = await phone.estimatedDocumentCount();

        await phone.create({ ...insertDb })

        const newcount = await phone.estimatedDocumentCount();

        const getImage = await phone.find()
        const phoneDBname = getImage[0]['phone'];
        const phoneName = insertDb.phone

        expect(count).toEqual(0);
        expect(phoneDBname).toEqual(phoneName);
        expect(newcount).toEqual(1);
    });

    test('test endpoints', async (done) => {
        const phone = await mongoose.model('phone', iphoneSchema);

        router.get('/api/')
            .expect(200, done)
        
        router.get('/api/buy')
            .expect(200, done)
        
        router.get('/api/sell')
            .expect(200, done)
        
        router.get('/api/update')
        .expect(200,done)
        
    })

    // test("test endpoints with filter data")

});