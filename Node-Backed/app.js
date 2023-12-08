const express = require('express');
const { JsonRpcProvider } = require('ethers');

// Setup the provider to connect to the Avalanche testnet
const provider = new JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');

const app = express();
app.use(express.json());

app.post('/transaction', async (req, res) => {
    const txHash = req.body.txHash;
    if (!txHash) {
        return res.status(400).send('Transaction hash is required');
    }

    try {
        const tx = await provider.getTransaction(txHash);
        res.json(tx);
    } catch (error) {
        res.status(500).send(`Error fetching transaction: ${error.message}`);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
