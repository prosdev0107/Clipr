import React from 'react'
import { jss } from 'react-jss'

const ApplicationWrapper = ({ page_is_loading, data_saving_status, fonts }) => {


    // Add fonts
    if (typeof fonts !== "undefined") {
        for (let i=0; i < fonts.length; i++) {
            let font = fonts[i]
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

    return page_is_loading ?

        // While page is initizalizing, we should display a loader
        <div className="page-loader-fullscreen height-full width-full">
            <div className="page-loader" />
        </div>

        :

        null

}

export default ApplicationWrapper
