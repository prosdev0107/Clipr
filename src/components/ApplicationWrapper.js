import React from 'react'
import { jss } from 'react-jss'

const ApplicationWrapper = ({ page_is_loading, data_saving_status, stickers_fonts, theme_fonts }) => {


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
            let fontMeta = 'theme_font_'+font.id

            // Add font if not existing yet
            if (document.querySelectorAll("[data-meta='"+fontMeta+"']").length === 0) {

                let sources_regular = "url('"+font.source+"') format('woff2'), url('"+font.source.replace('woff2','woff')+"') format('woff')"
                let src_medium = font.source.replace('-regular','-medium')
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



    return page_is_loading ?

        // While page is initizalizing, we should display a loader
        <div className="page-loader-fullscreen height-full width-full">
            <div className="page-loader" />
        </div>

        :

        null

}

export default ApplicationWrapper
