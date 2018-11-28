import React from 'react'
import createCSItemFromFile from '../utilities/API/CSItemMedia'
import { FormattedMessage } from 'react-intl'

const ImportAPIMedia = ({media, showResizer}) => {

    const renderMedia = () => {
        if (media.type === "img") {
            return <div onClick={() => clickImage()}>
                <img className={"width-full"} src={media.source.preview} alt="..." />
            </div>
        }
        return <div>
            <video className={"width-full"} src={media.source.preview} controls />
            <button className={"btn btn-default select-video"} onClick={() => clickVideo()}>
                <FormattedMessage id={"common.choose"} />
            </button>
        </div>
    }

    const clickImage = () => {

        // Ask for image resize before upload
        showResizer(media.source.src)

    }

    const clickVideo = () => {

        // Directly upload video
        createCSItemFromFile(media.source.src)

    }

    return (
        <div
            className="api-library-media relative"
        >

            {renderMedia()}

        </div>
    )
}


export default ImportAPIMedia
