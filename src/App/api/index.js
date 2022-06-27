import axios from 'axios'
import servicesConfig from '../config/services.json'

export default axios.create({
    baseURL: servicesConfig.api.baseURL
});