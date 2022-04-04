// import axios from 'axios'
import apiClient from '../../services/axios';

const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['X-XSRF-TOKEN'] = token
        localStorage.setItem('japaaToken', token)
    } else {
        delete apiClient.defaults.headers.common['X-XSRF-TOKEN']
    }
}

export default setAuthToken