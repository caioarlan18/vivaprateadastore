const axios = require('axios');
module.exports = {
    async criarCheckout(req, res) {
        const { customer, items, shipping } = req.body;
        const baseurl = "https://caioarlan18.github.io/vivaprateadastore/#/"
        const token = "bbcb7b4a-218c-4a83-ba49-48292697e5719971a87a4185b5c68fbee78951fbc12a3888-06ed-4cd6-abcc-2d70755abeab";
        const options = {
            method: 'POST',
            url: 'https://sandbox.api.pagseguro.com/checkouts',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            data: {
                reference_id: 'ITEM01', // Certifique-se de que é único
                expiration_date: '2024-08-14T19:09:10-03:00', // Atualize para uma data futura
                customer: customer,
                customer_modifiable: true,
                items: items,
                additional_amount: 0,
                discount_amount: 0,
                shipping: shipping,
                payment_methods: [{ type: 'CREDIT_CARD' }, { type: 'DEBIT_CARD' }, { type: 'BOLETO' }, { type: 'PIX' }],
                payment_methods_configs: [
                    {
                        type: 'credit_card',
                        config_options: [{ option: 'installments_limit', value: '12' }]
                    }
                ],
                soft_descriptor: 'VIVAPRATEADA',
                redirect_url: `${baseurl}/compraefetuada`,
                return_url: 'https://pagseguro.uol.com.br',
                notification_urls: ['https://pagseguro.uol.com.br']
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            res.status(500).json({ error: error.response ? error.response.data : error.message });
        }
    }
}
