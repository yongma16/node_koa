const axios = require('axios')


const axiosInstance = (baseURL, headers) => {
    const instance = axios.create({
        baseURL: baseURL,
        timeout: 20000,
        headers: {...headers }
    });

    return instance
}

const postAction = (baseURL, path, headers, data) => {
    const http = axiosInstance(baseURL, headers)
    return http.post(path, data)
}



module.exports = {
    postAction
}