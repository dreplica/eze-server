import supertest from 'supertest';
import mongoose from 'mongoose';
import 'regenerator-runtime/runtime'

import app from '../app'
import mongoServer from './mongosetup/memoryserver';
import { iphoneSchema } from '../src/model/mongooseModel';
import insertDb from './dummyData';

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

        await phone.insertMany(insertDb)

        const getImage = await phone.find()
        const testImageDBname = getImage[0]['phone'];

        expect(count).toEqual(0);
        expect(testImageDBname).toMatch(/\w*_*/);
        expect(getImage.length).toEqual(insertDb.length);
    });
})

describe('test for API endpoints', () => {

    test('test endpoints /api/ to return 200 And 404', async (done) => {

        router.get('/api/')
            .expect('Content-type', /json/)
            .expect(200, done)
    })

    test('test endpoints /api/ with query to return 200 ', async (done) => {
        router.get('/api/?limit=6&page=1&phone=iphone&sort=1&condition=a1')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err

                const length = res.body.result.length
                const condition = res.body.result.every((item) => item.condition === 'A1')

                expect(length >= 1 && length <= 6).toBe(true)
                expect(condition).toBe(true)
                done()
            })
    })

    test('test endpoints /api/ with bad condition query', async (done) => {
        router.get('/api/?limit=6&page=1&phone=iphone&sort=1&condition=a5')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err
                const length = res.body.result.length
                expect(length).toEqual(0)
                done()
            })
    })


    test('test endpoints /api/update to return 200', async (done) => {
        router.get('/api/update')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {

                if (err) {
                    console.log('error :>> ', err);
                    throw err
                }
                done()
            })

    })

    test('test endpoints for buy request to return 200 ', async (done) => {

        router.get('/api?sell=buy')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err

                const length = res.body.result.length
                const condition = res.body.result.every((item) => item.sell === 'buy')

                expect(length === 10).toBe(true)
                expect(condition).toBe(true)
                done()
            })
    })

    test('test endpoints /api/ for "buy" request return value', async (done) => {

        router.get('/api?sell=buy')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err

                const length = res.body.result.length
                const condition = res.body.result.some((item) => item.sell === 'sell')

                expect(length > 10).toBe(false)
                expect(condition).toBe(false)
                done()
            })
    })

    test('test endpoints /api/ for bad "buy" request', async (done) => {
        router.get('/api?sell=buy&condition=a5')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err
                const length = res.body.result.length
                expect(length).toEqual(0)
                done()
            })
    })

    test('test endpoints for sell request to return 200 ', async (done) => {

        router.get('/api?sell=sell')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err

                const length = res.body.result.length
                const condition = res.body.result.every((item) => item.sell === 'sell')

                expect(length === 10).toBe(true)
                expect(condition).toBe(true)
                done()
            })
    })

    test('test endpoints /api/ for "sell" request return value', async (done) => {

        router.get('/api?sell=sell')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err

                const length = res.body.result.length
                const condition = res.body.result.some((item) => item.sell === 'buy')

                expect(length > 10).toBe(false)
                expect(condition).toBe(false)
                done()
            })
    })

    test('test endpoints /api/ for bad "sell" request', async (done) => {
        router.get('/api?sell=sell&condition=a5')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err
                const length = res.body.result.length
                expect(length).toEqual(0)
                done()
            })
    })
    test('test endpoints /api/ for pagination', async (done) => {
        router.get('/api')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err
                const keys = Object.keys(res.body)
                console.log('keys :>> ', keys);
                expect(keys.length).toEqual(3)
                expect(keys.includes('previous')).toBe(true)
                expect(keys.includes('forward')).toBe(true)
                expect(typeof res.body[keys[0]]).toBe('object')
                expect(typeof res.body[keys[1]]).toBe('object') 
                expect(res.body['previous']['page']).toBe(undefined) 
                expect(res.body['forward']['page']).toBe(2) 
                done()
            })
    })


})