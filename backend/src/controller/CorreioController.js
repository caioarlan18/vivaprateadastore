const axios = require('axios');

module.exports = {
    async calcFrete(req, res) {
        const { cepCliente } = req.body
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTYiLCJqdGkiOiI4NThkZTFmODYyYzIwNzY2YThlYWZjYzUzNzg3MTZiZDViZDBiYmFmMTMwNjM3M2I4M2FjN2UxZTk1YWY5YzMxMjEwODFkZjM3ZTk1MzhmZCIsImlhdCI6MTcyMzQzODEwNC4zOTUwODksIm5iZiI6MTcyMzQzODEwNC4zOTUwOTMsImV4cCI6MTc1NDk3NDEwNC4zNzUxNTIsInN1YiI6IjljYmVlYjNlLTkxODMtNDY3OC1iNzA5LTQ5NmY1MTc5M2NmMiIsInNjb3BlcyI6WyJjYXJ0LXJlYWQiLCJjYXJ0LXdyaXRlIiwiY29tcGFuaWVzLXJlYWQiLCJjb21wYW5pZXMtd3JpdGUiLCJjb3Vwb25zLXJlYWQiLCJjb3Vwb25zLXdyaXRlIiwibm90aWZpY2F0aW9ucy1yZWFkIiwib3JkZXJzLXJlYWQiLCJwcm9kdWN0cy1yZWFkIiwicHJvZHVjdHMtZGVzdHJveSIsInByb2R1Y3RzLXdyaXRlIiwicHVyY2hhc2VzLXJlYWQiLCJzaGlwcGluZy1jYWxjdWxhdGUiLCJzaGlwcGluZy1jYW5jZWwiLCJzaGlwcGluZy1jaGVja291dCIsInNoaXBwaW5nLWNvbXBhbmllcyIsInNoaXBwaW5nLWdlbmVyYXRlIiwic2hpcHBpbmctcHJldmlldyIsInNoaXBwaW5nLXByaW50Iiwic2hpcHBpbmctc2hhcmUiLCJzaGlwcGluZy10cmFja2luZyIsImVjb21tZXJjZS1zaGlwcGluZyIsInRyYW5zYWN0aW9ucy1yZWFkIiwidXNlcnMtcmVhZCIsInVzZXJzLXdyaXRlIiwid2ViaG9va3MtcmVhZCIsIndlYmhvb2tzLXdyaXRlIiwid2ViaG9va3MtZGVsZXRlIiwidGRlYWxlci13ZWJob29rIl19.N3ur5MP3Sl_-8XSgwS0N0TGjYtXCpKLTNUTcWrF7dfWU-XvJ4FlrRmM83jE1ftWnVVFPQ6G64ACGQt4KlBOBIsEGLid_CqBGXMduGMO1CF7aTbGkGTEa402k7YYXud-zDrg9BJRd3PAmZx5_vjtjL8HZfHrPC_L3vOa8l5FJJAxtqoeH5A5OZuvEnWc8m0hRdLj1sfrGBjAjrk7o5FbJT-eFhIBSjWi7zmXt8Jv6HTadn9PaWqD1JoxDgrLtVe8OV-EtB06oTF8XHIStzuwtW-5i_t4ihdxRS0rModa7RoYgTALjnDcTwlYSZBq1ZPWulySIxgtRJ2sfsXanpN-TtKufj1UdxmrV4lJUvVgUbAJy-1nwmvVTPdx3zSHzMd0q1J2ioDSZlNAxgb9pP68ylc2Ez68mFkSsGS2DV3ZsUY5adFrhe18NoNbqqKfuHA7EHJm9RzaXHCCvuff6IngoEXrls5Boe3HFLQCSUH-Zg4PhNoNvKVnGGuSmYCNc4PMKLUZkc6MSpa_wyPIyjmNkFpYFoj3JPvA0PJotvqyV0QI8_TMnkIo5-dwaU-slWQ7ASV9KmlN0mCXpbqosiprA9Thgok1dN8az5k0862JTiCnvuOZAJScztwqTLtJUHNFMMRL4HkQ--fEGwOMYIIe1EGGjMnnS5CiKU8Io_tD_E2M'
        const options = {
            method: 'POST',
            url: 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate',
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
