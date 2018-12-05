import React from 'react'
import { FormattedMessage } from 'react-intl'
import createCSItemFromFile from "../utilities/API/CSItemMedia";

const ImportMediaValidate = ({file, cropped_zone, display_resizer, confirmMedia, cancelResize}) => {


    /*const loadPreviewImg = (img) => {
console.log(img)
        // If file is a File object, read it then load into the preview
        if (typeof file === "string") {
            img.src = file
        } else {
            let reader = new FileReader();
            reader.onload = function (e) {
                img.src = reader.result
            }
        }
    }*/

    const validateResize = () => {

        // Send to server with the final cropping area and create the item
        createCSItemFromFile(file, cropped_zone)

    }

    return <div className={file ? "import-controls width-full" : "hidden"}>

        {/* On the left, preview of current preselected image */}
        <img
            id={"import-preview"}
            alt={"selected media preview left"}
            className={"absolute absolute-center-vertical margin-left-20"}
            src={file}
            height={80}
            // onLoad={() => loadPreviewImg(this)}
        />

        {/* On the right, buttons to confirm media selection or cropping, and a back button if on resizer */}
        <div className={"btn-wrapper absolute absolute-center-vertical"}>

            <button
                className={display_resizer ? "btn btn-default btn-round margin-right-10" : "hidden"}
                onClick={() => cancelResize()}
            >
                <FormattedMessage id="common.back"/>
            </button>

            <button
                className={"btn btn-primary btn-round"}
                onClick={() => display_resizer ? validateResize() : confirmMedia()}
            >
                <FormattedMessage id="common.submit"/>
            </button>

        </div>

    </div>
}

export default ImportMediaValidate
