import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import {renderField} from "./form/renderField"
import {reduxForm} from "redux-form"
import { FormattedMessage } from 'react-intl'

class ImportMediaResizer extends React.Component {

    setEditorRef = (editor) => this.editor = editor

    onImageReady = () => {
        // Store zone to crop init value
        this.updateZoneToCrop()
    }

    onImageChange = () => {
        this.updateZoneToCrop()
    }

    updateZoneToCrop = () => {
        if (this.editor) {
            // Get the final cropping area
            // Cropping will ve executed server-side
            let imgRect = this.editor.getCroppingRect()
            this.props.updateCroppedZone(imgRect)
        }
    }

    render () {

        let file = this.props.file

        if (typeof this.props.file === "undefined"
            || this.props.file === null
            || typeof this.props.file.source === "undefined") {
            return <div />
        }

        let windowHeight = window.innerHeight
        let margin = 330
        let previewHeight = windowHeight > 0 ? Math.min(489,windowHeight-margin) : 489
        let previewWidth = previewHeight * 300 / 489;


        // How to choose min scale factor to have an image that fits entirely the window when slider is at min
        // Knowing scale = 1 => full screen fit
        let mediaRatio = file.ratio || 1 // Width / Height
        let croppingZoneRatio = previewWidth / previewHeight

        // The formula to compute minimum scale to use is simply :
        let minScale =
            mediaRatio > 0 && croppingZoneRatio > 0 ?
            Math.min(mediaRatio / croppingZoneRatio, croppingZoneRatio / mediaRatio) : 1;

        // When not full screen, user should not be allowed to drag image
        // So we block image at center of the cropping area
        let position = null
        if (this.editor) {
            let imgRect = this.editor.getCroppingRect()
            if (imgRect.x < 0 || imgRect.y < 0) {
                position = {x:0.5,y:0.5}
            }
        }

        // Define inputs that let user manipulate image
        let zoom_properties = {
            id: "resizer_input_zoom",
            value: this.props.zoom,
            hideValue: true,
            type: "css",
            input: {
                type: "number_slider",
                min: minScale,
                max: 3,
                step: 0.02
            }
        }

        // If is video, need to show thumbnail image
        let fileUrl = file.type === "video" ? file.source.thumbnail : file.source.src

        return (
            <div className={"row text-center"}>

                {/* iPhone preview */}
                <div className={"col-sm-7"}>

                    <div className={"inline-block crop-preview relative"}>

                        <AvatarEditor
                            ref={this.setEditorRef}
                            image={fileUrl}
                            width={previewWidth}
                            height={previewHeight}
                            border={40}
                            scale={this.props.zoom}
                            onImageReady={() => this.onImageReady()}
                            onImageChange={() => this.onImageChange()}
                            className={""}
                            color={[0, 0, 0, 0.7]}
                            // position={typeof this.state.position.x !== "undefined" ? this.state.position : undefined}
                            // Watch image position change to avoid moving it out of broder
                            position={position === null ? undefined : position}
                        >
                        </AvatarEditor>

                        <iframe src={this.props.url_preview + "&only_native=1"}
                                className={"absolute absolute-center"}
                                title={"resize-iframe"}
                                width={previewWidth} height={previewHeight}
                                sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts"
                                ></iframe>

                    </div>

                </div>

                {/* Zoom slider */}
                <div className={"col-sm-5"}>

                    <div className={"absolute absolute-center resizer-actions"}>

                        <p className={"font-size-18"}><FormattedMessage id={"import.media.resizer.instructions"} /></p>

                        <p className={"font-size-16 margin-bottom-10"}><FormattedMessage id={"import.media.resizer.zoom"} /></p>

                        {renderField(zoom_properties,this.props.formChanged)}

                    </div>


                </div>


            </div>
        )
    }
}

export default reduxForm({
    form: 'importMediaResizerForm'
})(ImportMediaResizer)
