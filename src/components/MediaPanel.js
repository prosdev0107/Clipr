import React from 'react'

import StickerLayerContainer from '../containers/central/StickersLayerContainer'
import {CsItemTypes, CsItemDefaults} from "./propTypes/CsItemTypes"
import {OverlayTypes} from "./propTypes/OverlayTypes";
import {MEDIA_PANEL_ID} from "../constants/constants"
import PropTypes from 'prop-types'
import ClipIframeContainer from '../containers/central/ClipIframeContainer'

/**
 * The Media Panel is where we can customize media with content
 * It has 4 layers (from bottom to top) :
 * - Media layer : display the media itself (picture or video)
 * - Overlay layer : A transparent layer just above media that allows make text more readable
 * - Stickers layer : Where we can drag, resize, rotate our layers
 * - Buttons layer : All the clip native elements like cta buttons, header...
 * @returns {*}
 * @constructor
 */
const MediaPanel = ({ cs_item, general }) => {

    console.log("general is",general)
    let overlay = general.overlay || {}
    let mediaParams = general.media || {}
    let overlay_styles = {
        backgroundColor: overlay.color,
        opacity: overlay.opacity
    }

    const renderBlurBackground = (cs_item) => {

        if (typeof cs_item.media !== "undefined") {

            let blur_background_styles = {
                backgroundImage: "url('"+(cs_item.media.thumbnail || cs_item.media.src)+"')"
            }

            return !(mediaParams.fit_screen || 0) ?
                "" : <div id="blur-background" className="blur-background absolute-center" style={blur_background_styles}/>
        }
        return ""
    }

    // Display image or video depending of media type
    const renderMedia = (cs_item) => {

        if (typeof cs_item === "undefined" || typeof cs_item.media === "undefined") {
            return null
        }

        // Full screen or fit screen with blurred background ?
        let posterType = mediaParams.fit_screen || 0 ? "poster-fit-screen" : "poster-full-screen"

        if (cs_item.media.isVideo) {

            let src_mp4 = cs_item.media.src.replace(cs_item.ext,'-comp.mp4')
            let src_webm = cs_item.media.src.replace(cs_item.ext,'-comp.webm')

            return <video
                className={`poster  absolute-center ${posterType}`}
                webkit-playsinline="true" playsinline="true"
                onLoad={(event) => fillMediaMethod(event)}
            >
                <source src={src_mp4} type='video/mp4'/>
                <source src={src_webm} type='video/webm'/>
            </video>

        } else {

            return <img
                className={`poster absolute-center ${posterType}`}
                src={cs_item.media.src}
                alt="media"
                onLoad={(event) => fillMediaMethod(event)}
            />
        }
    }

    // Adapt to height or width depending of media dimensions
    const fillMediaMethod = (event) => {

        let media = event.target
        let mediaPanelRect = document.getElementById(MEDIA_PANEL_ID).getBoundingClientRect()
        if (typeof media !== "undefined") {

            let isVideo = typeof media.videoWidth !== "undefined" && media.videoWidth != null;
            let mediaWidth = isVideo ? media.videoWidth : media.width,
                mediaHeight = isVideo ? media.videoHeight : media.height,
                panelWidth = mediaPanelRect.width,
                panelHeight = mediaPanelRect.height

            // Make video full screen : fill panelWidth if width too big, else fill width
            if (mediaWidth/mediaHeight > panelWidth/panelHeight) {
                media.classList.add('poster-fill-height')
            } else {
                media.classList.add('poster-fill-width')
            }
        }
    }

    return <div  className="media-panel-container absolute-center">

        <div id={MEDIA_PANEL_ID} className="media-panel">

            {/* Media layer */}
            <div className="media-panel-layer media-panel-layer-media">

                {renderBlurBackground(cs_item)}

                {renderMedia(cs_item)}

            </div>

            {/* Overlay layer */}
            <div className="media-panel-layer media-panel-layer-overlay" style={overlay_styles}>

            </div>

            {/* Stickers layer */}
            <div className="media-panel-layer media-panel-layer-stickers">
                <StickerLayerContainer />
            </div>

            {/* Interactions layer */}
            <div className="media-panel-layer media-panel-layer-buttons">

                <ClipIframeContainer />

            </div>

        </div>

    </div>
}

MediaPanel.propTypes = {
    cs_item: PropTypes.shape(CsItemTypes),
    overlay: PropTypes.shape(OverlayTypes)
}
MediaPanel.defaultProps = {
    cs_item: CsItemDefaults,
}


export default MediaPanel
