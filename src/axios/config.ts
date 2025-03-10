const config: any = {
    baseUrl: '',
    socketUrl: '',
}

if (process.env.NODE_ENV === 'development') {
    config.baseUrl = 'http://192.168.111.71:8081'
} else if (process.env.NODE_ENV === 'production') {
    config.baseUrl = 'https://applyback.ydelite.org'
}

export default config
