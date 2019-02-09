const request = require('supertest');
const server = require('./server.js');
const db = require('./data/dbConfig');


describe('testing api', () => {
    describe('get /', () => {
        it('responds with 200', async () => {
            const response = await request(server)
            .get('/');
            expect(response.status).toBe(200);
        });

        it('responds with json', async () => {
            const response = await request(server)
            .get('/');
            expect(response.type).toMatch(/json/i);
        });

        it('sends correct response object', async () => {
            const response = await request(server)
            .get('/');
            expect(response.body).toEqual([]);
        })
    });

    describe('post /', () => {

        afterEach(async () => {
            db('bears').truncate();
        });

        it('responds with 201', async () => {
            const body = { name: 'Fred' };
            const response = await request(server)
            .post('/').send(body);
            expect(response.status).toBe(201);
        });
        
        it('responds with 400 when missing data', async () => {
            const body = {  };
            const response = await request(server)
            .post('/').send(body);
            expect(response.status).toBe(400);
        });

        it('responds with an arrray containing new id', async () => {
            const body = { name: 'Fred' };
            const response = await request(server)
            .post('/').send(body);
            expect(response.body.length).toBe(1);
        })
    })

    describe('delete /:id', () => {
        it('responds with 200', async () => {
            const response = await request(server)
            .get('/');
            expect(response.status).toBe(200);
        });
    })
})