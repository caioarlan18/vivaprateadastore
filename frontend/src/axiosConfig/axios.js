import axios from 'axios';
import baseurl from '../components/baseurl/BaseUrl';
const api = axios.create(
    { baseURL: baseurl }
)


export default api