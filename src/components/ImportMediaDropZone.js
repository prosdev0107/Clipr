import React from 'react'
import Dropzone from 'react-dropzone'
import createCSItemFromFile from '../utilities/API/CSItemMedia'

class ImportMediaDropZone extends React.Component {

    state = {
        file: {},
        encoded: "",
        infoUpload: "NO_FILE",
        isUploading: false
    }

    // Show preview of image/video while it's uploaded to the server
    renderPreview = () => {

        if (this.state.encoded.length === 0) {
            return <div/>
        } else if (this.state.file.isVideo) {
            return <video src={this.state.encoded} width={200} controls alt="preview"/>
        } else {
            return <img src={this.state.encoded} alt="preview" width={200}/>
        }
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

    renderDropZoneText = () => {

        switch (this.state.infoUpload) {

            case "NO_FILE":
                return "Chargez votre image ou vidéo. Les vidéos sont raccourcies à 5s sur Snapchat."

            case "WRONG_FILE":
                return <span className='orange-a400'>Le fichier doit être une image format .png ou .jpg, ou une vidéo format mp4, mkv, mov, flv ou webm, et ne peut excéder 25 Mo.</span>

            case "UPLOADING_FILE":
                return <span className='green-a400'>En cours de transfert...</span>

            default:
                return null

        }
    }

    render() {

        return <div className={"dropzone "+ (this.state.isUploading ? "disabled" : "")}>

            <Dropzone
                onDrop={this.onDrop.bind(this)}
                onDropRejected={this.onDropRejected.bind(this)}
                multiple={false}
                accept={"image/jpeg, image/png, video/*"}
                maxSize={25000000}
            >
                <p>{this.renderDropZoneText()}</p>
            </Dropzone>

            {this.renderPreview()}

            <aside>
                <h2>Dropped files</h2>
                <ul>
                    <li key={this.state.file.name}>{this.state.file.name} - {this.state.file.size} bytes</li>
                </ul>
            </aside>

        </div>
    }
}

export default ImportMediaDropZone
