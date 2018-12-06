import React from 'react'
import { FormattedMessage } from 'react-intl'

const ImportAPIMedia = ({media, isCurrentlyPreselected, preselectMedia}) => {

    const clickMedia = () => {

        // Ask for image resize before upload
        preselectMedia(media)

    }
    let mediaUrl = media.source.src_comp

    return media.type === "img" ?
        <div
            className={"api-library-media relative "+ (isCurrentlyPreselected ? "selected" : "")}
            onClick={() => clickMedia()}
        >
            <img src={mediaUrl} alt="..." />
        </div>
        :
        <div
            className={"api-library-media relative "+ (isCurrentlyPreselected ? "selected" : "")}
            onClick={() => clickMedia()}
        >
            <video src={mediaUrl} controls />
            <button className={"btn btn-default btn-round select-video"} onClick={() => clickMedia()}>
                <FormattedMessage id={"common.choose"} />
            </button>
        </div>
}


export default ImportAPIMedia
