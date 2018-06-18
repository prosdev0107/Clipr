const dev = {
    api_clipr: {
        API_BASE_URL: "http://app.clipr.local:8888/app_dev.php/fr/api",
        TOKEN_ENDPOINT: "http://app.clipr.local:8888/app_dev.php/oauth/v2/token"
    }
}

const staging = {
    api_clipr: {
        API_BASE_URL: "https://test.clipr.co/fr/api",
        TOKEN_ENDPOINT: "https://test.clipr.co/oauth/v2/token"
    }
}

const prod = {
    api_clipr: {
        API_BASE_URL: "https://app.clipr.co/fr/api",
        TOKEN_ENDPOINT: "https://app.clipr.co/oauth/v2/token"
    }
}

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : (process.env.REACT_APP_STAGE === 'staging' ? staging : dev)

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
}
