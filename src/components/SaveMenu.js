import React from 'react'
import {Button} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

const SaveMenu = ({data_saving_status,canUndo,canRedo,buttonClicked}) => {

    const renderSaveLabel = () => {

        if (data_saving_status > 0) {

            // Display saving status
            return <span><b>
                { data_saving_status === 1 ?
                    <FormattedMessage id="save_menu.saving" /> :
                    ( data_saving_status === 2 ? <FormattedMessage id="save_menu.saved" /> : "" ) }
            </b></span>
        }

        // Display nothing
        return null
    }

    const closeButtonPressed = (event) => {

        // Directly closes window
        buttonClicked('SAVE_MENU_CLOSE_BTN_PRESSED',event)
    }


    return <div className="save-menu margin-bottom-20">

        {renderSaveLabel()}

        <Button
            bsStyle="info"
            className={"inline-block btn-floating btn-sm margin-left-20 " + (canUndo ? "" : "disabled")}
            onClick={() => buttonClicked('SAVE_MENU_UNDO_BTN_PRESSED')}
        >
            <i className="fa fa-undo"></i>
        </Button>

        <Button
            bsStyle="info"
            className={"inline-block btn-floating btn-sm margin-left-20 " + (canRedo ? "" : "disabled")}
            onClick={() => buttonClicked('SAVE_MENU_REDO_BTN_PRESSED')}
        >
            <i className="fa fa-repeat"></i>
        </Button>

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