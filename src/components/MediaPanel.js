import React from 'react'

import StickerLayerContainer from '../containers/central/StickersLayerContainer'
import {CsItemTypes, CsItemDefaults} from "./propTypes/CsItemTypes"
import {OverlayTypes,OverlayDefaults} from "./propTypes/OverlayTypes";
import {MEDIA_PANEL_ID} from "../constants/constants"

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
const MediaPanel = ({ cs_item, overlay }) => {

    let overlay_styles = {
        backgroundColor: overlay.color,
        opacity: overlay.opacity
    }

    // Display image or video depending of media type
    const renderMedia = (cs_item) => {

        if (typeof cs_item === "undefined" || typeof cs_item.media === "undefined") {
            return null
        }

        // Full screen or fit screen with blurred background ?
        let posterType = cs_item.media.fullScreen ? "poster-full-screen" : "poster-fit-screen"

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

    return <div id={MEDIA_PANEL_ID} className="media-panel">

        <div className="media-panel-layer media-panel-layer-media">
            {renderMedia(cs_item)}
        </div>

        <div className="media-panel-layer media-panel-layer-overlay" style={overlay_styles}>

        </div>

        <div className="media-panel-layer media-panel-layer-stickers">
            <StickerLayerContainer />
        </div>

        {/* <div className="media-panel-layer media-panel-layer-buttons">

        </div> */}

    </div>
}

MediaPanel.propTypes = {
    cs_item: CsItemTypes,
    overlay: OverlayTypes
}
MediaPanel.defaultProps = {
    cs_item: CsItemDefaults,
    overlay: OverlayDefaults
}


export default MediaPanel
