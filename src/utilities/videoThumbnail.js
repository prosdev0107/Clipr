

// Generate thumbnail from video (works only if video ready state is 4)
// ACCES CONTROL ALLOW ORIGIN * MUST BE SET ON TARGET VIDEO if loaded from external API
// Else, forget it !
export const generateVideoThumbnail = (video) => {

    // Create a canvas element
    let canvas = document.createElement('canvas')
    canvas.setAttribute('class','hidden')
    document.body.appendChild(canvas)

    // Container of media ?

    // make canvas same dimensions than video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    //generate thumbnail URL data
    var context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    var dataURL = ""
    try {
        // May fail depending on browser policy vs video CORS
        dataURL = canvas.toDataURL()
    } catch (err) {
        console.log('Error converting video to image URL : '+err)
    }

    // Remove canvas
    document.body.removeChild(canvas)

    return dataURL
}