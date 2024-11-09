const axios = require('axios');
module.exports = {
    async criarCheckout(req, res) {
        const { customer, items, shipping, payment_methods_configs } = req.body;
        const baseurl = "https://caioarlan18.github.io/vivaprateadastore/#/"
        const token = process.env.TOKENPAGBANK;
        const options = {
            method: 'POST',
            url: 'https://api.pagseguro.com/checkouts',
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            data: {
                reference_id: 'PRODUTO',
                customer: customer,
                customer_modifiable: true,
                items: items,
                additional_amount: 0,
                discount_amount: 0,
                shipping: shipping,
                payment_methods: [{ type: 'CREDIT_CARD' }, { type: 'DEBIT_CARD' }, { type: 'BOLETO' }, { type: 'PIX' }],
                payment_methods_configs: payment_methods_configs,
                soft_descriptor: 'VIVAPRATEADA',
                redirect_url: `${baseurl}compraefetuada`,
                return_url: `${baseurl}checkout`,
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
    },

    async consultarCheckout(req, res) {
        const checkoutId = req.params.checkoutId;
        const token = process.env.TOKENPAGBANK
        const options = {
            method: 'GET',
            url: `https://api.pagseguro.com/checkouts/${checkoutId}`,
            headers: { accept: '*/*', Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.request(options);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(400).json({ msg: "deu erro", error });
        }

    },

    async consultarTransacao(req, res) {
        const orderId = req.params.orderId;
        const token = process.env.TOKENPAGBANK
        const options = {
            method: 'GET',
            url: `https://api.pagseguro.com/orders/${orderId}`,
            headers: { accept: '*/*', Authorization: `Bearer ${token}` }
        };
        try {
            const response = await axios.request(options);
            res.status(201).json(response.data);
        } catch (error) {
            res.status(400).json({ msg: "deu erro", error });
        }
    }
}


