import axios from 'axios';
const api = axios.create(
    { baseURL: 'https://vivaprateadastore.onrender.com' }
)


export default api