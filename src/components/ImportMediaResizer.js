import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import {renderField} from "./form/renderField"
import {reduxForm} from "redux-form"
import { FormattedMessage } from 'react-intl'

class ImportMediaResizer extends React.Component {

    setEditorRef = (editor) => this.editor = editor


    onImageChange = () => {
        if (this.editor) {

            // Get the final cropping area
            // Cropping is executed server-side
            let imgRect = this.editor.getCroppingRect()
            this.props.updateCroppedZone(imgRect)
        }
    }


    render () {

        if (typeof this.props.file === "undefined" || this.props.file === null) {
            return <div />
        }

        // Define inputs that let user manipulate image
        let zoom_properties = {
            id: "resizer_input_zoom",
            value: this.props.zoom,
            hideValue: true,
            type: "css",
            input: {
                type: "number_slider",
                min: 1,
                max: 3,
                step: 0.02
            }
        }

        let windowHeight = window.innerHeight
        let margin = 250
        let previewHeight = windowHeight > 0 ? Math.min(489,windowHeight-margin) : 489
        let previewWidth = previewHeight * 300 / 489;

        return (
            <div className={"row text-center"}>

                {/* iPhone preview */}
                <div className={"col-sm-7"}>

                    <div className={"inline-block crop-preview"}>

                        <AvatarEditor
                            ref={this.setEditorRef}
                            image={this.props.file}
                            width={previewWidth}
                            height={previewHeight}
                            border={50}
                            scale={this.props.zoom}
                            onImageChange={() => this.onImageChange()}
                            className={""}
                            color={[0, 0, 0, 0.7]}
                        >
                        </AvatarEditor>

                        <iframe src="http://landing.clipr.local:8888/wufbox/test/?in_simulator=1&force_no_list=1&url_host=http://192.168.1.19:3000&only_native=1"
                                className={"absolute absolute-center"}
                                title={"resize-iframe"}
                                width={previewWidth} height={previewHeight}
                                sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts"
                                ></iframe>

                    </div>

                </div>

                {/* Zoom slider + Validate button */}
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
