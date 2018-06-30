import React from 'react'
import { jss } from 'react-jss'

const ApplicationWrapper = ({ page_is_loading, data_saving_status, fonts }) => {

    const renderDataSavingStatus = (data_saving_status) => {

        switch (data_saving_status) {

            case 0:
                return

            case 1:
                // Data is saving
                return <p>En cours de sauvegarde...</p>

            case 2:
                // Data is saved, need to display a message for 2 sec
                return <p>Sauvegardé !</p>

            default:
                // Probably an error
                return <p>{ data_saving_status }</p>

        }


    }

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

        // When data is sent to server for saving, we should display a loading state
        <div className="absolute-center-horizontal page-data-saving">
            { renderDataSavingStatus(data_saving_status) }
        </div>


}

export default ApplicationWrapper
