import React from 'react'
import { FormattedMessage } from 'react-intl'

const ImportAPIMedia = ({media, isCurrentlyPreselected, preselectMedia}) => {

    const clickMedia = () => {

        // Ask for image resize before upload
        preselectMedia(media)

    }
    let mediaUrl = media.source.src_comp

    console.log('med',media);

    // Generate thumbnail from video if we don't have on yet
    // ACCES CONTROL ALLOW ORIGIN * MUST BE SET ON TARGET VIDEO if loaded from external API
    // Else, forget the library
    const generateThumbnail = (event) => {

        if ((media.source.thumbnail || "").length === 0
        || (media.source.thumbnail || "").indexOf('.mp4') !== -1) {

            // We need to generate image thumbnail ourself
            let button = event.target;
            let video = button.parentNode.querySelector("video");
            let canvas = button.parentNode.querySelector(".cancan");

            // make canvas same dimensions than video
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            //generate thumbnail URL data
            var context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            var dataURL = canvas.toDataURL();

            // Inject in media thumbnail field
            media.source.thumbnail = dataURL;
        }

        console.log(media)
        preselectMedia(media)
    }

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
            <video src={mediaUrl} controls crossorigin="anonymous"/>
            <button className={"btn btn-default btn-round select-video"} onClick={(e) => generateThumbnail(e)}>
                <FormattedMessage id={"common.choose"} />
            </button>
            <canvas className={"cancan hidden"}></canvas>
        </div>
}


export default ImportAPIMedia
