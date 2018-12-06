import React from 'react'
import Dropzone from 'react-dropzone'
import config from "../config"
import { FormattedMessage } from 'react-intl'
import {sendFileToLibrary} from '../utilities/API/CSItemMedia'
import { Line } from 'rc-progress'

class ImportMediaDropZone extends React.Component {

    state = {
        file: {},
        encoded: "",
        infoUpload: ""
    }

    // Cancel dropzone default inline style by setting an empty object
    // Style is set with CSS
    dropzoneStyle = {
    }

    onDrop = acceptedFiles => {

        this.setState({
            infoUpload: "ACCEPTED_FILE"
        })

        // There should be only one file per upload
        acceptedFiles.forEach(file => {

            let newFileInfo = {
                name: file.name,
                ext: file.name.split('.').pop(),
                isVideo: file.type.indexOf("video") !== -1
            }

            // Upload file to user personal library
            sendFileToLibrary(file)

            // Read file locally to show a preview to user while uploading data to the server
            const reader  =  new FileReader()
            reader.onload = () => {

                // Set local state (asynchronous !)
                this.setState({
                    file: newFileInfo,
                    encoded: reader.result
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

        return <div className={"dropzone"}>

            <Dropzone
                onDrop={this.onDrop.bind(this)}
                onDropRejected={this.onDropRejected.bind(this)}
                multiple={false}
                accept={"image/jpeg, image/png, video/*"}
                maxSize={config.MAX_UPLOAD_MEDIA_SIZE}
                style={this.dropzoneStyle}
            >
                {this.renderDropZoneText()}
                {this.renderPreviewZone()}
            </Dropzone>


        </div>

    }

    renderDropZoneText = () => {

        if (this.state.infoUpload === "WRONG_FILE") {
            // File is wrong (format/size...) and we warn user about that
            return <p className={"infoText absolute-center"}><span className='orange-a400'><FormattedMessage id="import.media.dropzone.WRONG_FILE" /></span></p>
        } else if (this.props.uploading_file) {
            // File is downloading : hide any text
            return null
        }

        // No file in zone, show indications
        return  <p className={"infoText absolute-center"}><FormattedMessage id="import.media.dropzone.NO_FILE" /></p>
    }


    renderPreviewZone = () => {

        // Show zone only when media is uploading
        if (!this.props.uploading_file || this.state.encoded.length === 0) {
            return null
        }

        let mediaPreview = this.state.file.isVideo ?
            <video className={"block"} src={this.state.encoded} controls /> :
            <img className={"block"} src={this.state.encoded} alt="preview" />

        let uploading_file_progress = this.props.uploading_file_progress
        let progressBar = uploading_file_progress === 0 ?  <div /> : <div className={"loader-progress-bar width-full absolute absolute-center-horizontal"}>
            <Line percent={uploading_file_progress} strokeWidth={4} trailWidth={4} strokeColor="#00D9EA" />
        </div>

        return <div className={"media-previews-wrapper"}>

            <div className={"media-preview-wrapper inline-block absolute absolute-center"}>

                {mediaPreview}

                {progressBar}

            </div>

        </div>

    }
    render() {

        return <div>

            {this.renderDropZone()}

        </div>
    }
}

export default ImportMediaDropZone
