import React from 'react'

import StickerLayerContainer from '../containers/central/StickersLayerContainer'
import {CsItemTypes, CsItemDefaults} from "./propTypes/CsItemTypes"
import {OverlayTypes} from "./propTypes/OverlayTypes";
import {MEDIA_PANEL_ID} from "../constants/constants"
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'

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
const MediaPanel = ({ cs_item, general, params, data_saving_status, buttonClicked }) => {

    let overlay = general.overlay
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

    let fake_interactions = ["interaction-timer","interaction-brand-name"]
    let fake_text = {
        "interaction-cta-title": "Lorem ipsum dolor sit amet"
    }
    switch (cs_item.cnv_type || "INPUT") {

        case "REDEEM":
            break

        case "SHOPPER":
            fake_interactions.push("interaction-shop-btn","interaction-cta-title-shopper","interaction-above-cta-button")
            break

        default:
            fake_interactions.push("interaction-cta-title")
            break
    }

    let interactions_styles = {}
    let interactions_main_color = ""
    let themes = params.themes || {} // For default font
    if (typeof general.theme !== "undefined") {
        let interactions_main_font = general.theme ? general.theme.font : (themes.default_font || "")
        interactions_main_color = general.theme ? general.theme.color : (themes.default_color || "")
        if (interactions_main_font != null && interactions_main_font.length > 0) {
            interactions_styles.fontFamily = "theme_"+interactions_main_font
            interactions_styles.fontWeight = 400
        }
    }

    // Buld a div that render theme font and theme
    const renderThemeSample = (type) => {
        switch (cs_item.cnv_type || "INPUT") {

            case "REDEEM":
               return <div className="fake-interaction interaction-redeem-slider">

                   <div className="interaction-redeem-slider-top-bar fill-gradient"></div>

                   <div className="interaction-redeem-slider-bottom-bar text-gradient">
                       <span className="absolute-center">Découvrir</span>
                   </div>

               </div>

            case "SHOPPER":
                return <div className="fake-interaction interaction-cta-button text-gradient border-gradient">
                    <span className="absolute-center">Ajouter au panier</span>
                </div>

            case "INPUT":
                return <div className="fake-interaction interaction-cta-button text-gradient border-gradient">
                    <span className="absolute-center">Participer</span>
                </div>

            default:
                return <div className="fake-interaction interaction-cta-button text-gradient border-gradient">
                    <span className="absolute-center">Visiter le site</span>
                </div>
        }
    }

    return <div  className="media-panel-container">

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
            <div className={"media-panel-layer media-panel-layer-buttons theme-"+interactions_main_color} style={interactions_styles}>

                {fake_interactions.map((text,idx) => (

                    <div key={idx} className={"fake-interaction "+text}>
                    </div>
                ))}

                {renderThemeSample(cs_item.cnv_type)}

            </div>



        </div>

        <div className="media-actions">
            <Button
                bsStyle="default"
                disabled={data_saving_status !== 0 ? true : false}
                className="inline-block"
                onClick={(event) => buttonClicked('MEDIA_PANEL_SAVE_BTN_PRESSED',event)}
            >
                <b>
                    { data_saving_status === 1 ? "Sauvegarde..." : (typeof data_saving_status === "string" ? data_saving_status : "Sauvegarder") }
                </b>
            </Button>
            <Button
                bsStyle="default"
                className="inline-block"
                onClick={(event) => buttonClicked('MEDIA_PANEL_DONE_BTN_PRESSED',event)}
            >
                Terminer
            </Button>
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
