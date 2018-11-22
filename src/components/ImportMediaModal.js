import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import ImportMediaLibraryContainer from "../containers/import/ImportMediaLibraryContainer"
import ImportMediaResizerContainer from "../containers/import/ImportMediaResizerContainer"

const ImportMediaModal = ({modal_show, closeModal}) => {

    if (modal_show) {
        setTimeout(function() {

            // TODO We have some problems with react bootstrap modal
            // We need to fire show event by ourselves
            document.querySelectorAll(".modal-open div.fade.in").forEach((elmt) => {
                elmt.classList.add("show")
            })
        },50)
    }

    return <div>
        <Modal
            show={modal_show}
            onHide={() => closeModal()}
            bsSize={"lg"}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Import Media
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <ImportMediaLibraryContainer />

                <ImportMediaResizerContainer />

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => closeModal()}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>

}

export default ImportMediaModal
