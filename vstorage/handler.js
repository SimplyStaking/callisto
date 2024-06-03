const axios = require('axios');

async function fetchVStorageData(vstoragePath) {
    console.log(`Fetching data for vstoragePath: ${vstoragePath}`);
    const apiUrl = 'https://main.rpc.agoric.net';
    const payload = {
        jsonrpc: '2.0',
        id: 1,
        method: 'abci_query',
        params: {
            path: `/custom/vstorage/data/${vstoragePath}`,
        },
    };

    console.log(`Request Payload: ${JSON.stringify(payload)}`);

    try {
        const response = await axios.post(apiUrl, payload);
        console.log(`Response Data: ${JSON.stringify(response.data)}`);

        if (response.data.result) {
            const result = response.data.result.response;
            const decodedValue = Buffer.from(result.value, 'base64').toString(
                'utf-8'
            );
            const parsedValue = JSON.parse(decodedValue);
            return parsedValue;
        } else {
            console.error('No result in response:', response.data);
            return null;
        }
    } catch (error) {
        console.error(
            'Error fetching vstorage data:',
            error.response ? error.response.data : error.message
        );
        return null;
    }
}

module.exports = fetchVStorageData;
