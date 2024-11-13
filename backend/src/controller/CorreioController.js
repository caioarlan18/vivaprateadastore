const axios = require('axios');

module.exports = {
    async calcFrete(req, res) {
        const { cepCliente } = req.body
        const token = process.env.TOKENCORREIO
        const options = {
            method: 'POST',
            url: 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'User-Agent': 'Aplicação caioarlan58@gmail.com'
            },
            data: {
                from: { postal_code: '72005590' },
                to: { postal_code: cepCliente },
                package: {
                    height: 4,
                    width: 12,
                    length: 17,
                    weight: 0.3
                }
            }
        };

        try {
            const response = await axios.request(options);
            res.status(200).json(response.data[0]);
        } catch (error) {
            console.error(error);
            res.status(400).json({ msg: "Erro ao calcular frete", error: error.message });
        }
    }
};
