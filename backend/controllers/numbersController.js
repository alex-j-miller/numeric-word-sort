const { numericsToAlpha } = require('../utils/numberToWords');

exports.postNumbers = (req, res) => {
    const numbers = req.body.numbers;

    if (!Array.isArray(numbers) || !numbers.every(num => typeof num === 'number')) {
        return res.status(400).json({ error: 'Please provide a list of numbers in the "numbers" field.' });
    }

    if (numbers.some(num => !Number.isInteger(num))) {
        return res.status(400).json({ error: 'All numbers must be integers.' });
    }
    if (numbers.some(num => num > 9000 || num < -9000)) {
        return res.status(400).json({ error: 'All numbers must be between -9000 and 9000.' });
    }

    const result = numericsToAlpha(numbers);
    res.json({ result });
};
