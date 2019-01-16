import React from 'react'
import { FormattedMessage } from 'react-intl'
import { createCSItemFromFile } from "../utilities/API/CSItemMedia";

// BOTTOM NAVIGATION BAR of modal

const ImportMediaValidate = ({preselected_media, cropped_zone, cropped_time, is_first_step, is_last_step, sendToReducers, cancelResize}) => {


    const renderPreview = () => {

        if ((preselected_media.source.thumbnail || "").length > 0
        || (preselected_media.type === "img" && (preselected_media.source.src || "").length > 0 )) {

            // Image, or video having a thumbnail
            return <img
                id={"import-preview"}
                alt={"loading..."}
                className={"absolute absolute-center-vertical margin-left-20"}
                src={(preselected_media.source.thumbnail || preselected_media.source.src_comp || preselected_media.source.src)}
                height={80}
            />
        } else if (preselected_media.type === "video") {

            return <video
                id={"import-preview"}
                className={"absolute absolute-center-vertical margin-left-20"}
                src={preselected_media.source.src}
                height={80}
            />
        }

        return <div/>
    }

    const submitClicked = () => {
        if (is_last_step) {
            // If we are on last step, launch media creation process
            createCSItemFromFile(preselected_media.source.src, cropped_zone, cropped_time)
        } else {
            sendToReducers("IMPORT_MEDIA_GO_NEXT_STEP")
        }
    }

    const cancelClicked = () => {
        sendToReducers("IMPORT_MEDIA_GO_PREVIOUS_STEP")
    }

    return <div className={(preselected_media.id || "").length > 0 ? "import-controls width-full" : "hidden"}>

        {/* On the left, preview of current preselected image */}
        {renderPreview()}

        {/* On the right, buttons to confirm media selection or cropping, and a back button if on resizer */}
        <div className={"btn-wrapper absolute absolute-center-vertical"}>

            <button
                className={is_first_step ? "hidden" : "btn btn-default btn-round padding-left-30 padding-right-30 font-size-16 margin-right-10"}
                onClick={() => cancelClicked()}
            >
                <FormattedMessage id="common.back"/>
            </button>

            <button
                className={"btn btn-primary btn-round padding-left-30 padding-right-30 font-size-16"}
                onClick={() => submitClicked()}
            >
                <FormattedMessage id="common.submit"/>
            </button>

        </div>

    </div>
}

export default ImportMediaValidate
