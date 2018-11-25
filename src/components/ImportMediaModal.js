import React from 'react'
import {Modal} from 'react-bootstrap'
import { Line } from 'rc-progress';
import ImportMediaLibraryContainer from "../containers/import/ImportMediaLibraryContainer"
import ImportMediaResizerContainer from "../containers/import/ImportMediaResizerContainer"

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
        let progressText= <span className={"infoProgress"}>Création du média en cours...{progressPercent}</span>
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

    return <div className={"import-media-modal"}>
        <Modal
            show={modal_show}
            onHide={() => closeModal()}
            bsSize={"lg"}
            className={"import-media-modal"}
            onScroll={(event) => handleScroll(event)}
        >
            <Modal.Header>

                <Modal.Title>
                    Import Media
                </Modal.Title>

                {/* TODO : utiliser propriété closeButton dans tag Modal.Title, mais avant faut loader le bon bootstrap CSS (3.3.7 ?) */}
                <button type="button" className="close" onClick={() => closeModal()}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>

            </Modal.Header>
            <Modal.Body>

                <div className={display_resizer ? "hidden" : ""}>
                    <ImportMediaLibraryContainer />
                </div>

                <div className={display_resizer ? "" : "hidden"}>
                    <ImportMediaResizerContainer />
                </div>

            </Modal.Body>

            { renderOverlay() }

        </Modal>
    </div>

}

export default ImportMediaModal
