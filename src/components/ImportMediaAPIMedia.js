import React from 'react'
import createCSItemFromFile from '../utilities/API/CSItemMedia'
import { FormattedMessage } from 'react-intl'

const ImportAPIMedia = ({media, isCurrentlyPreselected, preselectMedia}) => {

    const renderMedia = () => {

        let mediaUrl = media.source.preview

        if (media.type === "img") {
            return <div onClick={() => clickImage()}>
                <img className={"width-full "} src={mediaUrl} alt="..." />
            </div>
        }
        return <div>
            <video className={"width-full"} src={mediaUrl} controls />
            <button className={"btn btn-default select-video"} onClick={() => clickVideo()}>
                <FormattedMessage id={"common.choose"} />
            </button>
        </div>
    }

    const clickImage = () => {

        // Ask for image resize before upload
        preselectMedia(media.source.src)

    }

    const clickVideo = () => {

        // Directly upload video
        createCSItemFromFile(media.source.src)

    }

    return (
        <div
            className={"api-library-media relative "+ (isCurrentlyPreselected ? "selected" : "")}
        >

            {renderMedia()}

        </div>
    )
}


export default ImportAPIMedia
