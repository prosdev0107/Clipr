
const dev = {
    api_clipr: {
        API_BASE_URL: "http://app.clipr.local:8888/app_dev.php/fr/api",
        TOKEN_ENDPOINT: "http://app.clipr.local:8888/app_dev.php/oauth/v2/token"
    }
}

const staging = {
    api_clipr: {
        API_BASE_URL: "https://test.clipr.co/app_staging.php/fr/api",
        TOKEN_ENDPOINT: "https://test.clipr.co/app_staging.php/oauth/v2/token"
    }
}

const prod = {
    api_clipr: {
        API_BASE_URL: "https://app.clipr.co/fr/api",
        TOKEN_ENDPOINT: "https://app.clipr.co/oauth/v2/token"
    },
    api_giphy: {
        // Sandbox mode : 20k request per day
        API_KEY: "api_key=hob6IiP90kzZ5p3oejuIXiXwIqhYkVmv",
        BASE_URL: "https://api.giphy.com/v1",
        pagination: {
            dataKey: "data",        // Key name of response data containing the results
            param: "offset",        // The param name to use in query
            type: "length",         // Means we should query "from the Xth sticker"
            per_page: 25,
        },
        endpoint: {
            empty: "/stickers/trending?",
            stickers: "/stickers/search?"
        }
    },
    api_pixabay: {
        // Sandbox mode : 5k request per hour
        API_KEY: "key=9512251-e467040217bcf2094b0ef186b",
        BASE_URL: "https://pixabay.com/api",
        pagination: {
            dataKey: "hits",        // Key name of response data containing the results
            param: "page",          // The param name to use in query
            type: "page",           // Means we should query "from the Xth page"
            per_page: 20,
        },
        endpoint: {
            empty: "/?image_type=vector&q=like",
            stickers: "/?image_type=vector"
        }
    }
}

const config = process.env.REACT_APP_STAGE === 'production'
    ? prod
    : (process.env.REACT_APP_STAGE === 'staging' ?
        { ...prod, ...staging} : { ...prod, ...dev})

export default {
    // Add common config values here
    MAX_ATTACHMENT_SIZE: 5000000,
    ...config
}
