import React from 'react'
import {Button} from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'

class SaveMenu extends React.Component {


    renderSaveLabel() {

        if (this.props.data_saving_status > 0) {

            // Display saving status
            return <span><b>
                { this.props.data_saving_status === 1 ?
                    <FormattedMessage id="save_menu.saving" /> :
                    ( this.props.data_saving_status === 2 ? <FormattedMessage id="save_menu.saved" /> : "" ) }
            </b></span>
        }

        // Display nothing
        return null
    }

    closeButtonPressed(event) {

        // Directly closes window
        this.props.buttonClicked('SAVE_MENU_CLOSE_BTN_PRESSED',event)
    }


    componentDidMount() {

        const {buttonClicked} = this.props

        function handleKeyDown(event) {

            // Is user pressing ctrl (PC) or cmd (Mac) key ?
            if (event.ctrlKey || event.metaKey) {

                // Is user pressing simultaneously pressing z or y ?
                if( event.which === 89){
                    // User wants to redo action
                    buttonClicked('SAVE_MENU_REDO_BTN_PRESSED')
                }
                else if( event.which === 90){
                    // User wants to undo action
                    buttonClicked('SAVE_MENU_UNDO_BTN_PRESSED')
                }
            }
        }

        // Detect conventional redo/undo keyboard combination
        window.addEventListener("keydown", handleKeyDown)
    }

    render() {
        return <div
            className="save-menu margin-bottom-20">

            {this.renderSaveLabel()}

            <Button
                bsStyle="info"
                className={" btn-floating btn-sm margin-left-20 "
                + (this.props.canUndo ? "" : " disabled ")
                + (this.props.is_preview_mode ? " hidden " : " inline-block ")
                }
                onClick={() => this.props.buttonClicked('SAVE_MENU_UNDO_BTN_PRESSED')}
            >
                <i className="fa fa-undo"></i>
            </Button>

            <Button
                bsStyle="info"
                className={" btn-floating btn-sm margin-left-20 "
                + (this.props.canRedo ? "" : " disabled ")
                + (this.props.is_preview_mode ? " hidden " : " inline-block ")}
                onClick={() => this.props.buttonClicked('SAVE_MENU_REDO_BTN_PRESSED')}
            >
                <i className="fa fa-repeat"></i>
            </Button>

            <Button
                bsStyle="danger"
                className="inline-block btn-floating btn-sm margin-left-20"
                onClick={(event) => this.closeButtonPressed(event)}
            >
                <i className="fa fa-times"></i>
            </Button>


        </div>
    }
}

export default SaveMenu