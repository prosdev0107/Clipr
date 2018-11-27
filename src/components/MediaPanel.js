import React from 'react'

import StickerLayerContainer from '../containers/central/StickersLayerContainer'
import {MEDIA_PANEL_ID} from "../constants/constants"
import ClipIframeContainer from '../containers/central/ClipIframeContainer'
import {isSafari} from 'react-device-detect'
import PreviewSwitcherContainer from "../containers/central/PreviewSwitcherContainer"

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
const MediaPanel = ({ cs_item_general, cs_item_media, is_preview_mode, listen_drag_events }) => {

    let overlay = cs_item_general.overlay || {}
    let mediaParams = cs_item_general.media || {}
    let overlay_styles = {
        backgroundColor: overlay.color,
        opacity: overlay.opacity
    }

    const renderBlurBackground = () => {

        let blur_background_styles = {
            backgroundImage: "url('"+(cs_item_media.thumbnail || cs_item_media.src)+"')"
        }

        return !(mediaParams.fit_screen || 0) ?
            "" : <div id="blur-background" className="blur-background absolute-center" style={blur_background_styles}/>
    }

    // Display image or video depending of media type
    const renderMedia = () => {

        if (typeof cs_item_media === "undefined") {
            return null
        }

        // Full screen or fit screen with blurred background ?
        let posterType = mediaParams.fit_screen || 0 ? "poster-fit-screen" : "poster-full-screen"

        // Get thumbnail static image if video
        let mediaToImg = cs_item_media.isVideo ? cs_item_media.thumbnail : cs_item_media.src

        if (typeof mediaToImg === "undefined" || mediaToImg.length < 5) {
            return null
        }

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
                let mediaWidth = isVideo ? media.videoWidth : media.naturalWidth,
                    mediaHeight = isVideo ? media.videoHeight : media.naturalHeight,
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
        // Default is fill height because full screen by default
        return 'poster-fill-height'
    }

    const renderIPhone = () => (`
        <svg className="iphone-svg" width="320" height="634" viewBox="0 0 300 598">
                <g>
                <title>iPhone 6</title>
            <g fill-rule="evenodd" fill="none" id="Page-1">
                <g stroke="#7E89A3">
                    <path fill="#fff" id="bezel"
                          d="m299.06943,561.75696c0,20.27826 -16.50864,35.66663 -36.87408,35.66663l-224.69522,0c-20.36548,0 -36.87412,-15.38837 -36.87412,-35.66663l0,-525.31793c0,-20.27824 16.50864,-35.75151 36.87412,-35.75151l224.69522,0c20.36545,0 36.87408,15.47327 36.87408,35.75151l0,525.31793l0,0z"/>
                    <path id="speaker" fill="#f3f4f5"
                          d="m177.3954,58.64567c0,1.45779 -1.00781,2.63321 -2.24983,2.63321l-46.14888,0c-1.24429,0 -2.24982,-1.17772 -2.24982,-2.63321l0,-5.923c0,-1.45779 1.00782,-2.63322 2.24982,-2.63322l46.14888,0c1.242,0 2.24983,1.17772 2.24983,2.63322l0,5.923l0,0z"/>

                    <circle fill="#f3f4f5" r="7" cy="27" cx="150" id="camera"/>

                    <rect id="screen" height="427" width="257" y="82" x="21" fill="transparent"/>
                    <ellipse fill="#f3f4f5" ry="23" rx="23" cy="553" cx="150" id="lock"/>
                </g>
            </g>
            </g>
        </svg>`
    )

    return <div className="media-panel-container absolute-center">

        <div id={MEDIA_PANEL_ID} className={is_preview_mode ? "hidden" :"media-panel"}>

            {/* Media layer */}
            <div className={"media-panel-layer media-panel-layer-media "+cs_item_general.img_filter_class}>

                {renderBlurBackground()}

                {renderMedia()}

            </div>

            {/* Overlay layer */}
            <div className={"media-panel-layer media-panel-layer-overlay"} style={overlay_styles}>

            </div>

            {/* Stickers layer */}
            <div className={"media-panel-layer media-panel-layer-stickers"} >
                <StickerLayerContainer />
            </div>

            {/* Native elements layer or preview mode */}
            {/* On Safari, iframe CONTENT cannot be set entirely to pointer-event none, so will receive the drag over and on drop events */}
            {/* That's why we need to deactivate it while dragging elements */}
            <div className={"media-panel-layer media-panel-layer-buttons "
                +(isSafari && listen_drag_events ? "hidden" : "")} >

                <ClipIframeContainer is_preview={0} />

            </div>

        </div>

        {/* Iframe that displays clipr preview */}
        <div className={is_preview_mode ? " inline-block " : "hidden"}>

            <div dangerouslySetInnerHTML={{__html: renderIPhone()}} />

            <div className="iPhone6">

                <div className="container">
                    <ClipIframeContainer is_preview={1}/>
                </div>

            </div>

        </div>

        <PreviewSwitcherContainer />

    </div>
}


export default MediaPanel
