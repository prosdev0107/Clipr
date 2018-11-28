import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import {renderField} from "./form/renderField"
import {reduxForm} from "redux-form"
import createCSItemFromFile from '../utilities/API/CSItemMedia'
import { FormattedMessage } from 'react-intl'

class ImportMediaResizer extends React.Component {

    // https://www.npmjs.com/package/react-avatar-editor
    state = {
        cropped_zone: {}
    }

    setEditorRef = (editor) => this.editor = editor


    onImageChange = () => {
        if (this.editor) {

            // Get the final cropping area
            // Cropping is executed server-side
            let imgRect = this.editor.getCroppingRect()
            this.setState({
                cropped_zone: imgRect
            })
        }
    }

    onClickSave = () => {

        // Send to server with the final cropping area and create the item
        createCSItemFromFile(this.props.file, this.state.cropped_zone)

        // Also save cropped zone in parameters
        /*this.props.formChanged({
            target: {
                name: 'resizer_input_cropping',
                value: imgRect
            }
        })*/
    }

    renderIPhone = () => (`
        <svg className="iphone-svg" width="320" height="634" viewBox="0 0 300 598">
                <g>
                <title>iPhone 6</title>
            <g fill-rule="evenodd" fill="none" id="Page-1">
                <g stroke="#7E89A3">
                    <path fill="#fff" id="bezel"
                          d="m299.06943,561.75696c0,20.27826 -16.50864,35.66663 -36.87408,35.66663l-224.69522,0c-20.36548,0 -36.87412,-15.38837 -36.87412,-35.66663l0,-525.31793c0,-20.27824 16.50864,-35.75151 36.87412,-35.75151l224.69522,0c20.36545,0 36.87408,15.47327 36.87408,35.75151l0,525.31793l0,0z"/>
                    <path id="speaker" fill="#f3f4f5"
                          d="m177.3954,58.64567c0,1.45779 -1.00781,2.63321 -2.24983,2.63321l-46.14888,0c-1.24429,0 -2.24982,-1.17772 -2.24982,-2.63321l0,-5.923c0,-1.45779 1.00782,-2.63322 2.24982,-2.63322l46.14888,0c1.242,0 2.24983,1.17772 2.24983,2.63322l0,5.923l0,0z"/>

                    <circle fill="#f3f4f5" r="7" cy="27" cx="150" id="camera"/>

                    <rect id="screen" height="427" width="257" y="82" x="21" fill="transparent"/>
                    <ellipse fill="#f3f4f5" ry="23" rx="23" cy="553" cx="150" id="lock"/>
                </g>
            </g>
            </g>
        </svg>`
    )


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

        return (
            <div className={"row text-center"}>

                {/* iPhone preview */}
                <div className={"col-sm-7"}>

                    <div className={"inline-block iPhone-resizer"}>



                        <div dangerouslySetInnerHTML={{__html: this.renderIPhone()}} />

                        <div className={"iPhone6"}>

                            <div className="container">

                                <AvatarEditor
                                    ref={this.setEditorRef}
                                    image={this.props.file}
                                    width={300}
                                    height={489}
                                    border={0}
                                    scale={this.props.zoom}
                                    onImageChange={() => this.onImageChange()}
                                    className={"absolute-center"}
                                >
                                </AvatarEditor>

                                <iframe src="http://landing.clipr.local:8888/wufbox/test/?in_simulator=1&force_no_list=1&url_host=http://192.168.1.19:3000&only_native=1"
                                        title={"resize-iframe"}
                                        sandbox="allow-forms allow-popups allow-pointer-lock allow-same-origin allow-scripts"
                                        width="0" height="0"></iframe>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Zoom slider + Validate button */}
                <div className={"col-sm-5"}>

                    <div className={"absolute absolute-center resizer-actions"}>

                        <p className={"font-size-18"}><FormattedMessage id={"import.media.resizer.instructions"} /></p>

                        <p className={"font-size-16 margin-bottom-10"}><FormattedMessage id={"import.media.resizer.zoom"} /></p>

                        {renderField(zoom_properties,this.props.formChanged)}

                        <button
                            className={"btn btn-primary btn-round btn-lg margin-top-20 padding-left-40 padding-right-40 padding-top-5 padding-bottom-5"}
                            onClick={() => this.onClickSave()}
                        >
                            <FormattedMessage id={"common.submit"} />
                        </button>

                    </div>


                </div>


            </div>
        )
    }
}

export default reduxForm({
    form: 'importMediaResizerForm'
})(ImportMediaResizer)
