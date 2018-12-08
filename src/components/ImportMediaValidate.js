import React from 'react'
import { FormattedMessage } from 'react-intl'
import { createCSItemFromFile } from "../utilities/API/CSItemMedia";

const ImportMediaValidate = ({preselected_media, cropped_zone, display_resizer, confirmMedia, cancelResize}) => {

    const validateResize = () => {

        // Send to server with the final cropping area and create the item
        createCSItemFromFile(preselected_media.source.src, cropped_zone)

    }

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

    return <div className={(preselected_media.id || "").length > 0 ? "import-controls width-full" : "hidden"}>

        {/* On the left, preview of current preselected image */}
        {renderPreview()}

        {/* On the right, buttons to confirm media selection or cropping, and a back button if on resizer */}
        <div className={"btn-wrapper absolute absolute-center-vertical"}>

            <button
                className={display_resizer ? "btn btn-default btn-round padding-left-30 padding-right-30 font-size-16 margin-right-10" : "hidden"}
                onClick={() => cancelResize()}
            >
                <FormattedMessage id="common.back"/>
            </button>

            <button
                className={"btn btn-primary btn-round padding-left-30 padding-right-30 font-size-16"}
                onClick={() => display_resizer ? validateResize() : confirmMedia()}
            >
                <FormattedMessage id="common.submit"/>
            </button>

        </div>

    </div>
}

export default ImportMediaValidate
