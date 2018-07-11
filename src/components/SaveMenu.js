import React from 'react'
import {Button} from 'react-bootstrap'
import SweetAlert from 'react-bootstrap-sweetalert'


class SaveMenu extends React.Component {

    state = {
        swal_show: false
    }

    renderSaveButton = (data_unsaved,data_saving_status) => {

        if (data_unsaved && data_saving_status === 0) {

            // Show user he can save data
            return <Button
                bsStyle="primary"
                disabled={data_saving_status !== 0}
                className="inline-block btn-round"
                onClick={(event) => this.props.buttonClicked('SAVE_MENU_SAVE_BTN_PRESSED',event)}
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

    closeButtonPressed = (event) => {
        if (this.props.data_unsaved > 0) {

            // Ask if users really wants to close window without saving data
            this.setState({ swal_show: true })

        } else {

            // Directly closes window
            this.closeWindow(event)
        }
    }

    closeWithoutSaving = (event) => {
        this.setState({swal_show: false});
        this.closeWindow(event);
    }

    closeWindow = (event) => {
        // Directly closes window
        this.props.buttonClicked('SAVE_MENU_DONE_BTN_PRESSED',event)
    }

    render() {

        return <div className="save-menu margin-bottom-20">

            {this.renderSaveButton(this.props.data_unsaved, this.props.data_saving_status)}

            <Button
                bsStyle="danger"
                className="inline-block btn-floating btn-sm margin-left-20"
                onClick={(event) => this.closeButtonPressed(event)}
            >
                <i className="fa fa-times"></i>
            </Button>

            <SweetAlert
                warning
                showCancel
                show={this.state.swal_show}
                confirmBtnText="Quitter sans sauvegarder"
                confirmBtnBsStyle="danger"
                cancelBtnText="Annuler"
                cancelBtnBsStyle="default"
                title="Voulez-vous vraiment quitter sans sauvegarder ?"
                onConfirm={(event) => { this.closeWithoutSaving(event) }}
                onCancel={() => this.setState({swal_show: false})}
            >
                Cette opération est irréversible !
            </SweetAlert>

        </div>
    }
}

export default SaveMenu