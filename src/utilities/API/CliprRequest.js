
import axios from 'axios'
import config from '../../config'

/**
 *  Pre-build request to Clipr API  by adding an Authorization header
 *
 * @param token
 * @returns {defaultOptions}
 * @constructor
 */
const CliprRequest = (token = null) => {

    const defaultOptions = {
        baseURL: config.api_clipr.BASE_URL,
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    // Create instance
    let instance = axios.create(defaultOptions)

    // if token not null, add to session
    if (token) {
        localStorage.setItem('access_token',token)
    }

    // Get token from session
    const access_token = localStorage.getItem('access_token')

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        config.headers.Authorization =  access_token ? `Bearer ${access_token}` : ''
        return config
    })

    return instance
}

export default CliprRequest
