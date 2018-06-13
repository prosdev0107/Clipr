const dev = {
    api_clipr: {
        BASE_URL: "http://app.clipr.local:8888/app_dev.php/fr"
    }
}

const prod = {
    api_clipr: {
        BASE_URL: "http://app.clipr.co/fr/"
    }
}

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : dev

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
}
