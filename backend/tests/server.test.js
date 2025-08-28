
const request = require('supertest');
const app = require('../server');

describe('POST /numbers', () => {
    it('should return alpha representations for valid numbers', async () => {
        const res = await request(app)
            .post('/numbers')
            .send({ numbers: [1, 12, 105, 9000] });
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toEqual([
            { number: 1, alpha: 'One' },
            { number: 12, alpha: 'Twelve' },
            { number: 105, alpha: 'One Hundred Five' },
            { number: 9000, alpha: 'Nine Thousand' }
        ]);
    });

    it('should return 400 for non-integer values', async () => {
        const res = await request(app)
            .post('/numbers')
            .send({ numbers: [1.5, 2] });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/integers/);
    });

    it('should return 400 for numbers out of range', async () => {
        const res = await request(app)
            .post('/numbers')
            .send({ numbers: [9001, -9001] });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/between -9000 and 9000/);
    });

    it('should return 400 for missing or invalid numbers field', async () => {
        const res = await request(app)
            .post('/numbers')
            .send({ numbers: 'not an array' });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/list of numbers/);
    });

    it('should return 400 for non-number elements in array', async () => {
        const res = await request(app)
            .post('/numbers')
            .send({ numbers: [1, 'two', 3] });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/list of numbers/);
    });

    it('should return 200 and empty result for empty array', async () => {
        const res = await request(app)
            .post('/numbers')
            .send({ numbers: [] });
        expect(res.statusCode).toBe(200);
        expect(res.body.result).toEqual([]);
    });

    it('should handle very large payloads (thousands of numbers)', async () => {
        const bigArray = Array.from({ length: 5000 }, (_, i) => i - 2500); // -2500 to 2499
        const res = await request(app)
            .post('/numbers')
            .send({ numbers: bigArray });
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.result)).toBe(true);
        expect(res.body.result.length).toBe(5000);
        // spot check a few
        expect(res.body.result[0]).toHaveProperty('number', -2500);
        expect(res.body.result[0]).toHaveProperty('alpha');
        expect(res.body.result[4999]).toHaveProperty('number', 2499);
    });

    it('should handle negative zero', async () => {
        const res = await request(app)
            .post('/numbers')
            .send({ numbers: [-0, 0] });
        expect(res.statusCode).toBe(200);
        // JS treats -0 and 0 as equal, but let's check both are present
        expect(res.body.result.length).toBe(2);
        expect(res.body.result[0]).toEqual({ number: 0, alpha: 'Zero' });
        expect(res.body.result[1]).toEqual({ number: 0, alpha: 'Zero' });
    });
});
