import React from 'react'
import { jss } from 'react-jss'
import LibraryContainer from "../containers/library/LibraryContainer"
import MediaPanelContainer from "../containers/central/MediaPanelContainer"
import PropertiesContainer from "../containers/properties/PropertiesContainer"
import SaveMenuContainer from "../containers/SaveMenuContainer"
import MediasSwitcherContainer from "../containers/central/MediasSwitcherContainer"
import ImportMediaModalContainer from "../containers/import/ImportMediaModalContainer"

const ApplicationWrapper = ({ page_is_loading, data_saving_status, stickers_fonts, theme_fonts, is_preview_mode, has_items, clickAppContainer }) => {


    // Add stickers fonts
    if (typeof stickers_fonts !== "undefined") {
        for (let i=0; i < stickers_fonts.length; i++) {
            let font = stickers_fonts[i]
            let fontMeta = 'font_'+font.id

            // Add font if not existing yet
            if (document.querySelectorAll("[data-meta='"+fontMeta+"']").length === 0) {

                let sources = "url('"+font.source+"') format('woff2'), url('"+font.source.replace('woff2','woff')+"') format('woff')"

                jss.createStyleSheet({
                    '@font-face': {
                        fontFamily: font.name,
                        fontWeight: 400,
                        fontStyle: 'normal',
                        src: sources,
                    },
                }, { meta: fontMeta }).attach()
            }
        }
    }

    // Add theme fonts, regular + medium
    if (typeof theme_fonts !== "undefined") {
        for (let i=0; i < theme_fonts.length; i++) {
            let font = theme_fonts[i]
            let fontMeta = 'font_'+font.id

            // Add font if not existing yet
            if (document.querySelectorAll("[data-meta='"+fontMeta+"']").length === 0) {

                let sources_regular = "url('"+font.source+"') format('woff2'), url('"+font.source.replace('woff2','woff')+"') format('woff')"
                let src_medium = font.source.replace('-Regular','-Medium')
                let sources_medium = "url('"+src_medium+"') format('woff2'), url('"+src_medium.replace('woff2','woff')+"') format('woff')"

                jss.createStyleSheet({
                    '@font-face': {
                        fontFamily: "theme_"+font.name,
                        fontWeight: 300,
                        fontStyle: 'normal',
                        src: sources_regular,
                    },
                }, { meta: fontMeta }).attach()

                jss.createStyleSheet({
                    '@font-face': {
                        fontFamily: "theme_"+font.name,
                        fontWeight: 400,
                        fontStyle: 'normal',
                        src: sources_medium,
                    },
                }, { meta: fontMeta }).attach()
            }
        }
    }


    const renderAppWithItemsContent = () => {

        if (is_preview_mode) {
            return <div className="height-full width-full" data-isbodywrapper="1" onClick={(event) => clickAppContainer(event)}>

                <MediaPanelContainer />

                <SaveMenuContainer />

            </div>
        }

        return <div className="height-full width-full" data-isbodywrapper="1" onClick={(event) => clickAppContainer(event)}>

            <ImportMediaModalContainer />

            <MediasSwitcherContainer />

            <LibraryContainer />

            <MediaPanelContainer />

            <PropertiesContainer/>

            <SaveMenuContainer />


        </div>
    }

    const renderAppWithNoItemsContent = () => {

        return <div className="height-full width-full" data-isbodywrapper="1" onClick={(event) => clickAppContainer(event)}>

            <ImportMediaModalContainer />

            <MediasSwitcherContainer />

            <MediaPanelContainer />

            <SaveMenuContainer />

        </div>
    }


    return page_is_loading ?

        // While page is initializing, we should display a loader
        <div className="page-loader-fullscreen height-full width-full">

            <div className="page-loader absolute-center">
                <div></div>
                <div></div>
                <div></div>
            </div>

        </div>

        : ( has_items ?

                <div className="height-full width-full" data-isbodywrapper="1" onClick={(event) => clickAppContainer(event)}>

                    { renderAppWithItemsContent() }

                </div> :

                renderAppWithNoItemsContent()

        )

}

export default ApplicationWrapper
