import React from 'react'

import StickerLayerContainer from '../containers/central/StickersLayerContainer'
import {CsItemTypes, CsItemDefaults} from "./propTypes/CsItemTypes"
import {OverlayTypes} from "./propTypes/OverlayTypes";
import {MEDIA_PANEL_ID} from "../constants/constants"
import PropTypes from 'prop-types'
import ClipIframeContainer from '../containers/central/ClipIframeContainer'
import {isSafari} from 'react-device-detect'

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
const MediaPanel = ({ cs_item, general, listen_drag_events }) => {

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

        // Get thumbnail static image if video
        let mediaToImg = cs_item.media.isVideo ? cs_item.media.thumbnail : cs_item.media.src

        // If image already loaded, need to call function manually to adapt media size depending on full screen on/off
        // Because of asynchronous rendering, we need to add class from there
        // TODO : do it a cleaner way using a local state
        let additionalClass = fillMediaMethod()

        return <img
            className={`poster absolute-center ${posterType} ${additionalClass}`}
            src={mediaToImg}
            alt="media"
            onLoad={() => fillMediaMethod()}
        />

        /*

        ON LOAD EVENT NOT WORKING ON VIDEO
        As a result, neither poster-fill-height nor poster-fill-width can be added
        if (cs_item.media.isVideo) {

            let src_mp4 = cs_item.media.src.replace(cs_item.ext,'-comp.mp4')
            let src_webm = cs_item.media.src.replace(cs_item.ext,'-comp.webm')

            return <video
                className={`poster  absolute-center ${posterType}`}
                webkit-playsinline="true" defaultMuted muted autoplay="autoplay" playsinline="true"
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
        }*/
    }

    // Adapt to height or width depending of media dimensions
    const fillMediaMethod = () => {

        let panel = document.getElementById(MEDIA_PANEL_ID)
        if (panel != null) {
            let mediaPanelRect = panel.getBoundingClientRect()
            let media = panel.querySelector(".media-panel-layer-media .poster")
            if (typeof media !== "undefined" && media !== null && (media.videoWidth || media.width)) {

                let isVideo = typeof media.videoWidth !== "undefined" && media.videoWidth != null;
                let mediaWidth = isVideo ? media.videoWidth : media.width,
                    mediaHeight = isVideo ? media.videoHeight : media.height,
                    panelWidth = mediaPanelRect.width,
                    panelHeight = mediaPanelRect.height

                // Make video full screen : fill panelWidth if width too big, else fill width
                if (mediaWidth/mediaHeight > panelWidth/panelHeight) {
                    media.classList.remove('poster-fill-width')
                    media.classList.add('poster-fill-height')
                    return 'poster-fill-height'
                } else {
                    media.classList.remove('poster-fill-height')
                    media.classList.add('poster-fill-width')
                    return 'poster-fill-width'
                }
            }
        }
        return ""
    }

    return <div className="media-panel-container absolute-center">

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
            {/* On Safari, iframe CONTENT cannot be set entirely to pointer-event none, so will receive the drag over and on drop events */}
            {/* That's why we need to deactivate it while dragging elements */}
            <div className={"media-panel-layer media-panel-layer-buttons "+(isSafari && listen_drag_events ? "hidden" : "")} >

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
