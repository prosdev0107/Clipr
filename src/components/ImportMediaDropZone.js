import React from 'react'
import Dropzone from 'react-dropzone'
import config from "../config"
import { FormattedMessage } from 'react-intl'

class ImportMediaDropZone extends React.Component {

    state = {
        file: {},
        encoded: "",
        infoUpload: "NO_FILE",
        isUploading: false
    }

    // Cancel dropzone default inline style by setting an empty object
    // Style is set with CSS
    dropzoneStyle = {
    }

    onDrop = acceptedFiles => {

        // There should be only one file per upload
        acceptedFiles.forEach(file => {

            let newFileInfo = {
                name: file.name,
                ext: file.name.split('.').pop(),
                isVideo: file.type.indexOf("video") !== -1
            }

            // Ask for image resize
            this.props.showResizer(file)

            // Launch file upload

            // Read file locally to show a preview to user while uploading data to the server
            const reader  =  new FileReader()
            reader.onload = () => {

                // Set local state (asynchronous !)
                this.setState({
                    file: newFileInfo,
                    encoded: reader.result,
                    isUploading: true,
                    infoUpload: "UPLOADING_FILE"
                })

            }

            // Fire reader load event
            reader.readAsDataURL(file)

        })
    }
    onDropRejected = (file) => {
        this.setState({
            infoUpload: "WRONG_FILE"
        })
    }

    renderDropZone = () => {

        // Hide dropzone when media is uploading
        if (this.state.infoUpload === "UPLOADING_FILE") {
            return null
        }

        return <div className={"dropzone"}>
            <Dropzone
                onDrop={this.onDrop.bind(this)}
                onDropRejected={this.onDropRejected.bind(this)}
                multiple={false}
                accept={"image/jpeg, image/png, video/*"}
                maxSize={config.MAX_UPLOAD_MEDIA_SIZE}
                style={this.dropzoneStyle}
            >
                <p className={"infoText absolute-center"}>{this.renderDropZoneText()}</p>
            </Dropzone>
        </div>

    }

    renderDropZoneText = () => {

        switch (this.state.infoUpload) {

            case "NO_FILE":
                return  <FormattedMessage id="import.media.dropzone.NO_FILE" />

            case "WRONG_FILE":
                return <span className='orange-a400'><FormattedMessage id="import.media.dropzone.WRONG_FILE" /></span>

            default:
                return null

        }
    }


    renderPreviewZone = () => {

        // Show zone only when media is uploading
        if (this.state.infoUpload !== "UPLOADING_FILE" || this.state.encoded.length === 0) {
            return null
        }

        let mediaPreview = this.state.file.isVideo ?
            <video src={this.state.encoded} controls /> :
            <img src={this.state.encoded} alt="preview" />

        return <div className={"media-preview-wrapper"}>

            <div className={"media-preview-container absolute-center"}>

                {mediaPreview}

            </div>

        </div>

    }
    render() {

        return <div>

            {this.renderDropZone()}

            {this.renderPreviewZone()}

        </div>
    }
}

export default ImportMediaDropZone
