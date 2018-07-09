import React from 'react'
import {Button} from 'react-bootstrap'

const SaveMenu = ({ data_unsaved, data_saving_status, buttonClicked }) => {

    const renderSaveButton = (data_unsaved,data_saving_status) => {

        if (data_unsaved && data_saving_status === 0) {

            // Show user he can save data
            return <Button
                bsStyle="primary"
                disabled={data_saving_status !== 0}
                className="inline-block btn-round"
                onClick={(event) => buttonClicked('SAVE_MENU_SAVE_BTN_PRESSED',event)}
            >
                <b>
                    { data_saving_status === 1 ? "Sauvegarde..." : ( data_saving_status === 2 ? "Sauvegardé !" : (typeof data_saving_status === "string" ? data_saving_status : "Sauvegarder")) }
                </b>
            </Button>
        }

        if (data_saving_status > 0) {

            // Display saving status
            return <span><b>
                { data_saving_status === 1 ? "Sauvegarde..." : ( data_saving_status === 2 ? "Sauvegardé !" : "" ) }
            </b></span>
        }

        // Display nothing
        return <div/>
    }

    const closeWindow = (event) => {

        if (data_unsaved > 0) {

            // Ask if users really wants to close window without saving data

        } else {

            // Directly closes window
            buttonClicked('SAVE_MENU_DONE_BTN_PRESSED',event)
        }
    }

    return <div className="save-menu margin-bottom-20">

        { renderSaveButton(data_unsaved,data_saving_status) }

        <Button
            bsStyle="danger"
            className="inline-block btn-floating btn-sm margin-left-20"
            onClick={(event) => closeWindow(event)}
        >
            <i className="fa fa-times"></i>
        </Button>
    </div>
}

export default SaveMenu