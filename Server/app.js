const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const routes = require('./routes/routes');

app.use(cors());
app.use(express.json());

// Importing routes

app.use('/api', routes);
    app.get('/', (req, res) => {
        res.send('Welcome to the API');
    });

    app.use((req, res, next) => {
        res.status(404).json({ message: 'Route not found' });
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
