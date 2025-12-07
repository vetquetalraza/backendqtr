const express = require('express');
const axios = require('axios');
const router = express.Router();

const TOKEN = "sk_8122.azDG3ll9I0pmeV4oyYjsMuv1djdcwneI"

router.get('/:dni', async (req, res) => {
    const { dni } = req.params;

    try {
        const response = await axios.get(
            `https://api.apis.net.pe/v1/dni?numero=${dni}`,
            {
                headers: {
                    'Authorization': `Bearer ${TOKEN}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(400).json({ error: "No se pudo consultar el DNI" });
    }
});

module.exports = router;
