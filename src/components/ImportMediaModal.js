import React from 'react'
import {Modal} from 'react-bootstrap'
import ImportMediaValidateContainer from "../containers/import/ImportMediaValidateContainer"
import ImportMediaLibraryContainer from "../containers/import/ImportMediaLibraryContainer"
import ImportMediaResizerContainer from "../containers/import/ImportMediaResizerContainer"
import { FormattedMessage } from 'react-intl'

const ImportMediaModal = ({modal_show, preselected_media, creating_final_item, display_resizer, closeModal, loadMoreMedias}) => {

    if (modal_show) {
        setTimeout(function() {

            // TODO We have some problems with react bootstrap modal
            // Or maybe conflict with css files ?
            // We need to fire show event by ourselves
            document.querySelectorAll(".modal-open div.fade.in").forEach((elmt) => {
                elmt.classList.add("show")
            })
        },50)
    }


    const renderOverlay = () => {


        return <div className={creating_final_item ? "overlay" : "hidden"}>

            <div className={"loader-container absolute-center"}>

                <div className="page-loader absolute-center-horizontal">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <p>
                    <span className={"infoProgress"}>
                    <FormattedMessage id="import.media.creation" /></span>
                </p>

            </div>

        </div>
    }



    const handleScroll = (event) => {

        // Load more media if we reached the bottom of modal content

        let scrollTop = event.target.scrollTop
        let libraryHeight = event.target.offsetHeight
        let scrollHeight = event.target.scrollHeight

        let scrolledToBottom = Math.ceil(scrollTop + libraryHeight + 50) >= scrollHeight

        if (scrolledToBottom) {

            // What is the current tab ?
            let currentTab = document.querySelector('.import-media-modal .nav-tabs > li.active > a')

            if (currentTab != null) {

                if (currentTab.id.indexOf("-tab-3") !== -1) {

                    // Load more image
                    loadMoreMedias({
                        api_source: "pixabay",
                        type: "image"
                    })

                } else if (currentTab.id.indexOf("-tab-4") !== -1) {

                    // Load more videos
                    loadMoreMedias({
                        api_source: "pixabay",
                        type: "video"
                    })
                }
            }

        }
    }

    let hasUserPreselectedMedia = preselected_media !== null && (preselected_media.id || "").length > 0

    return <div className={"import-media-modal"}>
        <Modal
            show={modal_show}
            onHide={(e) => { /* Do nothing, there is bug if click inside modal then release outside */}}
            bsSize={"lg"}
            className={"import-media-modal"}
            onScroll={(event) => handleScroll(event)}
        >
            {/* When selecting media, modal header is quite useless so better hide it */}
            <Modal.Header className={display_resizer ? "relative" : "hidden"}>

                <Modal.Title>
                    <FormattedMessage id="import.media.title" />
                </Modal.Title>

                <button type="button" className="close" onClick={() => closeModal()}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>

            </Modal.Header>
            <Modal.Body className={ hasUserPreselectedMedia ? "footer-opened" : ""}>

                <button type="button" className={display_resizer ? "hidden" : "close absolute"} onClick={() => closeModal()}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>

                <div className={display_resizer ? "hidden" : ""}>
                    {/* Pick image from API or personal media */}
                    <ImportMediaLibraryContainer />
                </div>

                <div className={display_resizer ? "crop-preview-container absolute absolute-center width-full padding-left-20 padding-right-20" : "hidden"}>
                    {/* Crop/Move/Zoom on selected media */}
                    <ImportMediaResizerContainer />
                </div>

            </Modal.Body>

            {/* Confirm media selection/resize */}
            <ImportMediaValidateContainer />

            { renderOverlay() }

        </Modal>
    </div>

}

export default ImportMediaModal
