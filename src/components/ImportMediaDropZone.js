import React from 'react'
import Dropzone from 'react-dropzone'
import { FormattedMessage } from 'react-intl'
import {sendFileToLibrary} from '../utilities/API/CSItemMedia'
import { Line } from 'rc-progress'
import {MAX_UPLOAD_MEDIA_SIZE} from "../constants/constants"

class ImportMediaDropZone extends React.Component {

    state = {
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

            // Upload file to user personal library
            sendFileToLibrary(file)

        })
    }
    onDropRejected = (file) => {
        this.setState({
            infoUpload: "WRONG_FILE"
        })
    }

    renderDropZone = () => {

        return <div className={"dropzone "+(this.props.bigDropZone ? "big-dropzone absolute absolute-center" : "")}>

            <Dropzone
                onDrop={this.onDrop.bind(this)}
                onDropRejected={this.onDropRejected.bind(this)}
                multiple={false}
                accept={"image/jpeg, image/png, video/*"}
                maxSize={MAX_UPLOAD_MEDIA_SIZE}
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
        if (!this.props.uploading_file) {
            return null
        }

        let uploading_file_progress = this.props.uploading_file_progress

        return <div className={"loader-progress-bar width-full absolute absolute-center"}>
            <Line percent={uploading_file_progress} strokeWidth={4} trailWidth={4} strokeColor="#00D9EA" />
        </div>

    }
    render() {

        return <div>

            {this.renderDropZone()}

        </div>
    }
}

export default ImportMediaDropZone
