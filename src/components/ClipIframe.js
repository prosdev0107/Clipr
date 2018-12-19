import React from 'react'
import {resizeIframe} from "../utilities/simulatorSize"

const CliprIframe = ({theme, params, url_preview, is_preview}) => {

    // Find path to font source
    let theme_fonts = params.themes.fonts || {}
    let selected_font = theme.font || ""
    let fontSource = theme_fonts.find(function (obj) { return obj.name === selected_font })

    // Transform iframe content to keep only the buttons
    const transformIframe = (event) => {

        let iframe = event.target

        if (typeof fontSource !== "undefined") {
            // Edit theme properties
            iframe.contentWindow.postMessage({
                key: "EDIT_FROM_TEMPLATE_EDITOR",
                color: theme.color,
                use_static_color: theme.use_static_color,
                font: theme.font,
                fontSource: fontSource.source
            },iframe.src)
        }

        // Scale iframe to keep iphone look alike ratio
        refreshIframe()

        // Show iframe (with short timeout to let new CSS added to be executed)
        setTimeout(function() {
            iframe.style.opacity=1.0
        },1000)
    }

    // Load new theme without reloading the iframe
    var iframe = document.getElementById("Clip_Iframe")
    if (iframe != null) {

        if (typeof fontSource !== "undefined") {

            iframe.contentWindow.postMessage({
                key: "EDIT_FROM_TEMPLATE_EDITOR",
                color: theme.color,
                use_static_color: theme.use_static_color,
                font: theme.font,
                fontSource: fontSource.source
            }, iframe.src)
        }
    }

    const refreshIframe = () => {

        var iframe = document.getElementById('Clip_Iframe') || null
        var container = document.querySelector(".media-panel-layer-buttons")
        if (iframe) {
            resizeIframe(iframe, container.offsetWidth, container.offsetHeight)
        }
    }

    // Resize iframe dynamically to keep same appearance
    window.addEventListener("resize", refreshIframe)

    return is_preview ?

        <iframe
        id="Clip_Iframe_Preview"
        src={url_preview}
        title="Simulator"
        />

        :

        <iframe
            id="Clip_Iframe"
            src={url_preview + "&only_native=1"}
            title="Clip buttons only preview"
            allowtransparency="true"
            onLoad={(event) => transformIframe(event)}/>
}

export default CliprIframe
