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

describe('test for mongodb db', () => {

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
})

describe('test for API endpoints', () => {

    test('test endpoints /api/ to return 200', async (done) => {

        router.get('/api/')
            .expect('Content-type', /json/)
            .expect(200, done)

        router.get('/api/?limit=6&page=1&size=64&phone=iphone&sort=1&condition=a1&sell=buy')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                console.log("api/  dmamit", res.body)
                const length = res.body.result.length
                const condition = res.body.result.every((item) => item.condition === 'A1')
                console.log("the length", length)
                console.log("the condition", condition)
                expect(length <= 6).toBe(true)
                expect(condition).toBe(true)
                done()
            })
    })


    test('test endpoints /api/update to return 200', async (done) => {
        router.get('/api/update')
            .expect(200, done)
    })

    test('test endpoints /api/buy to return 200', async (done) => {

        router.get('/api/buy')
            .expect('Content-type', /json/)
            .expect(200, done)

        router.get('/api/buy?limit=6&phone=iphone&page=3&condition=a1&size=256&sell=buy&sort=1')
            .expect('Content-type', /json/)
            .expect(200, done)
    })



    test('test endpoints /api/sell to return 200', async (done) => {

        router.get('/api/sell')
            .expect('Content-type', /json/)
            .expect(200, done)

        router.get('/api/sell?limit=6&page=1&size=64&phone=iphone&sort=1&condition=a1&sell=sell')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                const length = res.body.result.length
                const condition = res.body.result.every((item) => item.condition === 'A1')
                console.log("the length", length)
                console.log("the condition", condition)
                expect(length <= 6).toBe(true)
                expect(condition).toBe(true)
                done()
            })
    })

    
})