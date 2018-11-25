import React from 'react'
// import LibraryContainer from "../containers/import/LibraryContainer"
import AvatarEditor from 'react-avatar-editor'
import {renderField} from "./form/renderField";
import {reduxForm} from "redux-form";
import createCSItemFromFile from '../utilities/API/CSItemMedia'

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


    render () {

        if (typeof this.props.file === "undefined" || this.props.file === null) {
            return <div />
        }

        // Define inputs that let user manipulate image
        let resizerInputs = [
            {
                id: "resizer_input_zoom",
                value: this.props.zoom,
                hideValue: true,
                type: "css",
                input: {
                    label: "Zoom",
                    type: "number_slider",
                    min: 1,
                    max: 3,
                    step: 0.02
                }
            }
        ]

        return (
            <div className={"text-center"}>

                <div className={"inline-block"}>

                    <AvatarEditor
                        ref={this.setEditorRef}
                        image={this.props.file}
                        width={300}
                        height={489}
                        border={50}
                        scale={this.props.zoom}
                        onImageChange={() => this.onImageChange()}
                    />

                </div>

                <form onChange={(event) => this.props.formChanged(event)} >

                    <table className="width-full">

                        <tbody>

                        {Object.entries(resizerInputs).map(([key, properties]) => {

                            return <tr key={key}>
                                <td className={"text-right"}>{properties.input.label}</td>
                                <td>
                                    {renderField(properties,this.props.formChanged)}
                                </td>
                            </tr>
                        })}

                        </tbody>

                    </table>

                </form>

                <button
                    className={"btn btn-primary btn-round"}
                    onClick={() => this.onClickSave()}
                >Valider</button>

            </div>
        )
    }
}

export default reduxForm({
    form: 'importMediaResizerForm'
})(ImportMediaResizer)
