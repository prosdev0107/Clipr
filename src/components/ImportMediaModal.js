import React from 'react'
import {Modal} from 'react-bootstrap'
import ImportMediaLibraryContainer from "../containers/import/ImportMediaLibraryContainer"
import ImportMediaResizerContainer from "../containers/import/ImportMediaResizerContainer"

const ImportMediaModal = ({modal_show, uploading_file, closeModal}) => {

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


    const renderOverlay = () => (
        <div className={uploading_file ? "overlay" : "hidden"}>
            <div className={"loader-container absolute-center"}>
                <div className="page-loader absolute-center-horizontal">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <p>Création du média en cours...</p>
            </div>
        </div>
    )

    return <div className={"import-media-modal"}>
        <Modal
            show={modal_show}
            onHide={() => closeModal()}
            bsSize={"lg"}
            className={"import-media-modal"}
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

                <ImportMediaLibraryContainer />

                <ImportMediaResizerContainer />

            </Modal.Body>

            { renderOverlay() }

        </Modal>
    </div>

}

export default ImportMediaModal
