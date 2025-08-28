
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


// Use the numbers route
const numbersRouter = require('./routes/numbers');
app.use('/numbers', numbersRouter);

const port = 3001;
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express server is running on port ${port}`);
    });
}

module.exports = app;