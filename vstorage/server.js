const express = require('express');
const fetchVStorageData = require('./handler');
const app = express();
const PORT = process.env.NODE_PORT || 3000;

app.use(express.json());

app.post('/fetchVStorageData', async (req, res) => {
    const { path: vstoragePath } = req.body.input;
    console.log('Received request for path:', vstoragePath);

    const data = await fetchVStorageData(vstoragePath);
    if (data) {
        res.json({ response: data });
    } else {
        res.status(500).json({ error: 'Error fetching vstorage data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
