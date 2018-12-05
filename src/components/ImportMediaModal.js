import React from 'react'
import {Modal} from 'react-bootstrap'
import { Line } from 'rc-progress'
import ImportMediaValidateContainer from "../containers/import/ImportMediaValidateContainer"
import ImportMediaLibraryContainer from "../containers/import/ImportMediaLibraryContainer"
import ImportMediaResizerContainer from "../containers/import/ImportMediaResizerContainer"
import { FormattedMessage } from 'react-intl'

const ImportMediaModal = ({modal_show, uploading_file, uploading_file_progress, display_resizer, closeModal, loadMoreMedias}) => {

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

        let progressPercent = uploading_file_progress > 0 ? " "+uploading_file_progress+"%" : ""
        let progressText=
            <span className={"infoProgress"}>
                <FormattedMessage id="import.media.creation" />
                ...{progressPercent}</span>
        let progressBar = uploading_file_progress === 0 ?  <div /> : <div className={"loader-progress-bar absolute-center-horizontal"}>
            <Line percent={uploading_file_progress} strokeWidth={4} trailWidth={4} strokeColor="#00D9EA" />
        </div>

        return <div className={uploading_file ? "overlay" : "hidden"}>
            <div className={"loader-container absolute-center"}>
                <div className="page-loader absolute-center-horizontal">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <p>{progressText}</p>

                {progressBar}

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

                if (currentTab.id.indexOf("-tab-2") !== -1) {

                    // Load clipr medias library
                    loadMoreMedias({
                        api_source: "clipr",
                        type: "all"
                    })

                } else if (currentTab.id.indexOf("-tab-3") !== -1) {

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
            <Modal.Body>

                <button type="button" className={display_resizer ? "hidden" : "close absolute"} onClick={() => closeModal()}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>

                <div className={display_resizer ? "hidden" : ""}>
                    {/* Pick image from API or personal media */}
                    <ImportMediaLibraryContainer />
                </div>

                <div className={display_resizer ? "absolute absolute-center width-full padding-left-20 padding-right-20" : "hidden"}>
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
