
import config from "../../config"
import axios from "axios/index"

export function vectorSourcing (source, type, text, offset, callback) {

    let source_info = config['api_'+source]

    // Endpoint ?
    let endpoint
    if ((text || "").length > 0) {
        endpoint = source_info.endpoint[type]
    } else {
        // No search text, so we made a custom query to provide content instead of an empty page
        endpoint = source_info.endpoint_default[type]
    }

    // Build full endpoint url
    let endpoint_url = source_info.BASE_URL+endpoint+"&"+source_info.API_KEY

    const formatMedias = (medias_original) =>  {

        let formatted_data = []

        switch (source) {

            case "giphy": {

                formatted_data = medias_original.map((media) => {

                    if (typeof media.images === "undefined" || typeof media.images.downsized === "undefined") {
                        return undefined
                    }

                    let imageData = media.images.downsized

                    return {
                        id: "giphy_"+media.id,
                        type: 'img',
                        ratio: Math.round(1000*imageData.height / imageData.width)/1000,
                        source: {
                            src: imageData.url,
                        }
                    }
                })

                break
            }

            case "pixabay": {

                formatted_data = medias_original.map((media) => {

                    if (type === 'video') {


                        // Take biggest format available
                        let videoFormat = media.videos[Object.keys(media.videos)[0]]

                        // If file is too big, do not display
                        if (videoFormat.height <= 0 || videoFormat.size > config.MAX_UPLOAD_MEDIA_SIZE) {
                            return undefined
                        }

                        return {
                            id: "pixabay_"+media.id,
                            type: 'video',
                            ratio: Math.round(1000*videoFormat.height / videoFormat.width)/1000,
                            source: {
                                src: videoFormat.url
                            }
                        }
                    }

                    if (typeof media.webformatURL === "undefined" || typeof media.webformatHeight === "undefined") {
                        return undefined
                    }

                    return {
                        id: "pixabay_"+media.id,
                        type: 'img',
                        ratio: Math.round(1000*media.webformatHeight / media.webformatWidth)/1000,
                        source: {
                            src: media.webformatURL,
                        }
                    }
                })

                break
            }

            default:
                break
        }

        // Remove null and undefined values and return results
        return formatted_data.filter(function (el) {
            return typeof el !== "undefined" && el !== null;
        })
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

        var mediasData = response.data[source_info.pagination.dataKey]

        if (typeof mediasData !== "undefined" && mediasData != null) {

            let shouldReinitializeContent = offset === 0

            // Also need to indicate pagination data here data because of asynchronous calls
            let paginationData = {
                count: mediasData.length,
                offset: offset,
            }
            console.log(formatMedias(mediasData))
            callback(formatMedias(mediasData), source, type, paginationData, shouldReinitializeContent)
        }
    })
}