import React from 'react'
import {Button} from 'react-bootstrap'


const SaveMenu = ({data_saving_status,buttonClicked}) => {

    const renderSaveButton = () => {

        if (data_saving_status > 0) {

            // Display saving status
            return <span><b>
                { data_saving_status === 1 ? "Sauvegarde..." : ( data_saving_status === 2 ? "Sauvegardé !" : "" ) }
            </b></span>
        }

        // Display nothing
        return <div />
    }

    const closeButtonPressed = (event) => {

        // Directly closes window
        buttonClicked('SAVE_MENU_CLOSE_BTN_PRESSED',event)
    }

    return <div className="save-menu margin-bottom-20">

        {renderSaveButton()}

        <Button
            bsStyle="danger"
            className="inline-block btn-floating btn-sm margin-left-20"
            onClick={(event) => closeButtonPressed(event)}
        >
            <i className="fa fa-times"></i>
        </Button>


    </div>
}

export default SaveMenu