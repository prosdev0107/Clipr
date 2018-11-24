import React from 'react'
import createCSItemFromFile from "../utilities/API/CSItemMedia";

const ImportAPIMedia = ({media}) => {

    const renderMedia = () => {
        if (media.type === "img") {
            return <img className={"width-full"} src={media.source.preview} alt="..." />
        }
        return <video className={"width-full"} src={media.source.preview} controls />
    }

    const clickMedia = () => {

        // Ask for item creation from media url
        createCSItemFromFile(media.source.src)

    }

    return (
        <div
            className="api-library-media relative"
            onClick={() => clickMedia()}
        >

            {renderMedia()}

        </div>
    )
}


export default ImportAPIMedia
