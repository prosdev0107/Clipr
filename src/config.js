const dev = {
    api_clipr: {
        API_BASE_URL: "http://app.clipr.local:8888/app_dev.php/fr/api",
        TOKEN_ENDPOINT: "http://app.clipr.local:8888/app_dev.php/oauth/v2/token"
    },
    api_giphy: {
        API_KEY: "hob6IiP90kzZ5p3oejuIXiXwIqhYkVmv"
    }
}

const staging = {
    api_clipr: {
        API_BASE_URL: "https://test.clipr.co/app_staging.php/fr/api",
        TOKEN_ENDPOINT: "https://test.clipr.co/app_staging.php/oauth/v2/token"
    },
    api_giphy: {
        API_KEY: "hob6IiP90kzZ5p3oejuIXiXwIqhYkVmv"
    }
}

const prod = {
    api_clipr: {
        API_BASE_URL: "https://app.clipr.co/fr/api",
        TOKEN_ENDPOINT: "https://app.clipr.co/oauth/v2/token"
    },
    api_giphy: {
        API_KEY: "hob6IiP90kzZ5p3oejuIXiXwIqhYkVmv"
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
