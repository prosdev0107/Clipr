
import config from "../../config"
import axios from "axios/index";

export function vectorSourcing (source, text, offset, callback) {

    let source_info = config['api_'+source]

    // Endpoint ?
    let endpoint = (text || "").length > 0 ? source_info.endpoint.stickers : source_info.endpoint.empty

    // Build full endpoint url
    let endpoint_url = source_info.BASE_URL+endpoint+"&"+source_info.API_KEY

    const formatStickers = (stickers_original) =>  {

        switch (source) {

            case "giphy": {

                return stickers_original.map((sticker) => {

                    if (typeof sticker.images === "undefined" || typeof sticker.images.downsized === "undefined") {
                        return undefined
                    }

                    let imageData = sticker.images.downsized

                    return {
                        id: "giphy_"+sticker.id,
                        type: 'img',
                        ratio: Math.round(1000*imageData.height / imageData.width)/1000,
                        source: {
                            src: imageData.url,
                        }
                    }
                })
            }

            case "pixabay": {

                return stickers_original.map((sticker) => {

                    if (typeof sticker.webformatURL === "undefined" || typeof sticker.webformatHeight === "undefined") {
                        return undefined
                    }

                    return {
                        id: "pixabay_"+sticker.id,
                        type: 'img',
                        ratio: Math.round(1000*sticker.webformatHeight / sticker.webformatWidth)/1000,
                        source: {
                            src: sticker.webformatURL,
                        }
                    }
                })
            }

            default:
                return []
        }
    }

    // Launch search

    // How to query the offset (offset being the number of objects already loaded) ?
    let from = source_info.pagination.type === "page" ? 1 + Math.round(offset / source_info.pagination.per_page) : offset
    let fromParam = source_info.pagination.param

    // Query text ?
    let query = ""
    if (text.length > 0) {
        query = "&q="+text
    }

    // Build final url to query
    let url = endpoint_url + query + "&" + fromParam + "=" + from

    axios.get(url).then((response) => {

        var stickersData = response.data[source_info.pagination.dataKey]

        if (typeof stickersData !== "undefined" && stickersData != null) {

            let shouldReinitializeContent = offset === 0

            // Also need to indicate pagination data here data because of asynchronous calls
            let paginationData = {
                count: stickersData.length,
                offset: offset,
            }
            callback(formatStickers(stickersData), source, paginationData, shouldReinitializeContent)
        }
    })
}