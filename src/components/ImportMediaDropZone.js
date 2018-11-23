import React from 'react'
import Dropzone from 'react-dropzone'
import createCSItemFromFile from '../utilities/API/CSItemMedia'
import { Line } from 'rc-progress';

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

            // Launch file upload
            createCSItemFromFile(file)

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
                maxSize={25000000}
                style={this.dropzoneStyle}
            >
                <p className={"infoText absolute-center"}>{this.renderDropZoneText()}</p>
            </Dropzone>
        </div>

    }

    renderDropZoneText = () => {

        switch (this.state.infoUpload) {

            case "NO_FILE":
                return "Chargez votre image ou vidéo. Les vidéos sont raccourcies à 5s sur Snapchat."

            case "WRONG_FILE":
                return <span className='orange-a400'>Le fichier doit être une image format .png ou .jpg, ou une vidéo format mp4, mkv, mov, flv ou webm, et ne peut excéder 25 Mo.</span>

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
            <video src={this.state.encoded} controls alt="preview"/> :
            <img src={this.state.encoded} alt="preview" />

        let progressText= <span className={"infoProgress"}>En cours de transfert - {this.props.uploading_file_progress}%</span>
        let progressBar = <Line percent={this.props.uploading_file_progress} strokeWidth={4} trailWidth={4} strokeColor="#00D9EA" />

        return <div className={"media-preview-wrapper"}>

            <div className={"media-preview-container absolute-center"}>

                {mediaPreview}

                {progressText}

                {progressBar}

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
