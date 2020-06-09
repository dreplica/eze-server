import supertest from 'supertest';
import mongoose from 'mongoose';
import mongoServer from './mongosetup/memoryserver';
import 'regenerator-runtime/runtime'
import { iphoneSchema } from '../src/model/mongooseModel';


// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;


beforeAll(async () => {
    await mongoServer
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('DB test and CRUD', () => {
    test('test if phones database got created', async () => {
        const phone = mongoose.model('phone', iphoneSchema);
        const count = await phone.estimatedDocumentCount();
        expect(count).toEqual(0);
    });

    test('Database recieves data', async () => {
        // const 
    })

});