// import './installSesLockdown';

import express from 'express';
import 'dotenv/config';
import fetchVStorageData from './handler';

const app = express();
const port = process.env.PORT || 3232

// Existing route
app.get('/', (req, res) => {
  res.send('Server is running!!!');
});

app.use(express.json()); // Middleware to parse JSON bodies in incoming requests

app.post('/fetchVStorageData', async (req, res) => {
    const { subPath } = req.body.input;
    console.log('Received request for path:', subPath);

    const data = await fetchVStorageData(subPath);

    if (data) {
        res.json({ response: data });
    } else {
        res.status(500).json({ error: 'Error fetching vstorage data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});