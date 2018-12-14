import React from 'react'

const ImportAPIMedia = ({media, isCurrentlyPreselected, preselectMedia}) => {

    const clickMedia = () => {

        // Ask for image resize before upload
        preselectMedia(media)

    }
    let mediaUrl = media.source.src_comp

    // Generate thumbnail from video if we don't have on yet
    // ACCES CONTROL ALLOW ORIGIN * MUST BE SET ON TARGET VIDEO if loaded from external API
    // Else, forget the library
    const generateThumbnail = (event) => {

        if ((media.source.thumbnail || "").length === 0
        || (media.source.thumbnail || "").indexOf('.mp4') !== -1) {

            // We need to generate image thumbnail ourself
            let button = event.target

            // Container of media ?
            let mediaContainer = button.closest(".api-library-media")
            let video = mediaContainer.querySelector("video")
            let canvas = mediaContainer.querySelector("canvas")

            // make canvas same dimensions than video
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            //generate thumbnail URL data
            var context = canvas.getContext('2d')
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
            var dataURL = canvas.toDataURL()

            // Inject in media thumbnail field
            media.source.thumbnail = dataURL
        }

        preselectMedia(media)
    }

    const removeControls = (event) => {
        // With firefox, we need to remove controls this way
        let video = event.target
        video.controls = false
    }

    const playVideo = (event) => {

        // Play video the user is hovering
        let video = event.target
        if(video.paused){
            video.play();
        }
    }

    const stopVideo = (event) => {

        // Play video the user is leaving the video
        let video = event.target
        if(!video.paused){
            video.pause();
        }
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
            <video controls crossOrigin="anonymous" loop
                   onLoadStart={(e) => removeControls(e)}
                   onClick={(e) => generateThumbnail(e)}
                   onMouseOver={(e) => playVideo(e)}
                   onMouseOut={(e) => stopVideo(e)}
                   /* poster={(media.source.thumbnail || "")} */
            >
                <source src={mediaUrl} type="video/mp4" />
            </video>
            <i className={"fas fa-video"}></i>
            <canvas className={"hidden"}></canvas>
        </div>
}


export default ImportAPIMedia
