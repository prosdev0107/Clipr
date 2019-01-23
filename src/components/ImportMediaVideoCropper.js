import React from 'react'
import InputRange from 'react-input-range';
import {reduxForm} from "redux-form";
import 'react-input-range/lib/css/index.css'
import {generateVideoThumbnail} from "../utilities/videoThumbnail"

// No reliable plugin for that one !
// Need to do all by ourselves

class ImportMediaVideoCropper extends React.Component {

    state = {
        player: 0,
        playerVisible: true,
        timer: {
            min: 0,
            max: 0
        },
        videoDuration: 0,
        videoIsPlaying: false,
        maxVideoWidth: 640
    }

    // With firefox, we need to remove controls this way
    removeControls = (event) => {
        let video = event.target
        video.controls = false
    }

    // Init slider max range value with video durations
    manageVideoDuration = (e) => {

        let video = e.target;
        let newDuration = video.duration

        if (newDuration > 0 && newDuration !== this.state.videoDuration) {

            // Update time cropper slider
            this.setState({
                videoDuration: newDuration,
                timer: {
                    min: 0,
                    max: newDuration
                }
            })

            // Store to global state
            this.props.updateDurations({
                start: 0,
                end: newDuration
            })

            // Also, adapt crop editor to window
            let modalHeight = document.querySelector('.import-media-modal .modal-content').offsetHeight;

            let videoHeight = video.videoHeight;
            let videoWidth = video.videoWidth;

            // let maxVideoHeight = modalHeight - 290;
            let maxVideoHeight = modalHeight - 200;
            let maxVideoWidth = Math.min(640, maxVideoHeight * videoWidth / videoHeight)

            this.setState({
                maxVideoWidth: maxVideoWidth
            })
        }
    }

    // Play/pause video control button
    toggleVideo = (state) => {
        let video = document.getElementById("trim-video");
        if(video.paused && (typeof state === "undefined" || state === 1)){
            video.play();
            this.setState({
                videoIsPlaying: true
            })
        } else if (typeof state === "undefined" || state === 0) {
            video.pause();
            this.setState({
                videoIsPlaying: false
            })
        }
    }

    // Avoid video playing beyond defined timer range
    manageVideoCurrentTime = (event) => {

        let video = event.target
        let currentTime = video.currentTime

        if (currentTime < this.state.timer.min || currentTime > this.state.timer.max ) {
            // Go back to video start
            this.setState({
                player: this.state.timer.min
            })
            video.currentTime = this.state.timer.min
        } else {
            // Update player position
            this.setState({
                player: currentTime
            })
        }
    }

    playerInputChanged = (value) => {

        this.setState({
            player: Math.min(this.state.timer.max, Math.max(this.state.timer.min,value))
        })

        let video = document.getElementById("trim-video")
        video.currentTime = value
        this.toggleVideo(1)
    }

    cropInputChanged = (value) => {

        let oldMin = this.state.timer.min

        // Edit local state
        this.cropInputChanging(value)
        setTimeout(() => {
            this.setState({
                playerVisible: true
            })
        },50)

        let correctedMax = Math.min(this.state.videoDuration, Math.max(0,value.max))
        let correctedMin = Math.min(correctedMax, Math.max(0,value.min))

        // Save to global state
        this.props.updateDurations({
            start: correctedMin,
            end: correctedMax
        })

        // If minimum value has changed, edit thumbnail
        if (oldMin !== correctedMin) {

            // Take screenshot AT CURRENT TIME
            setTimeout(function() {
                let video = document.getElementById("trim-video")
                let url = generateVideoThumbnail(video)
                this.props.sendToReducers("IMPORT_MEDIA_UPDATE_VIDEO_THUMBNAIL", url)
            }, 300);

        }
    }

    cropInputChanging = (value) => {


        // Pause video if was playing
        this.toggleVideo(0)

        // Are we editing left or right cursor
        let isMovingRightCursor = this.state.timer.max !== value.max;
        let isMovingLeftCursor = this.state.timer.min !== value.min;

        // If moving right cursor, move video player cursor on it
        let newPlayerPosition = isMovingRightCursor ?
            value.max :
            (isMovingLeftCursor ? value.min : this.state.player)

        this.setState({
            timer: value,
            player: newPlayerPosition,
            playerVisible: false
        })

        // Play video for 10ms to change current video appearance
        // With a little timeout, because we need an updated state
        let video = document.getElementById("trim-video")
        video.currentTime = newPlayerPosition
    }

    timeToString = (time) => {

        let remainingTime = time;

        let hours = Math.trunc(remainingTime/3600)
        let hoursString =  hours < 10 ? "0"+hours : hours;
        remainingTime = remainingTime - hours*3600

        let minutes = Math.trunc(remainingTime/60)
        let minString =  minutes < 10 ? "0"+minutes : minutes;
        remainingTime = remainingTime - minutes*60

        let seconds = Math.trunc(remainingTime)
        let secString =  seconds < 10 ? "0"+seconds : seconds;
        remainingTime = remainingTime - seconds

        let cents = Math.trunc(remainingTime*100)
        let centsString =  cents < 10 ? "0"+cents : cents;

        return hours > 0 ?
            hoursString+":"+minString+":"+secString+'"'+centsString :
            minString+":"+secString+'"'+centsString
    }

    renderVideo = () => {
        return !this.props.url_video || this.props.url_video.length === 0 ?
            <div />
            :
            <video id={"trim-video"}
                   crossOrigin="anonymous"
                   className={"block"}
                   width="640"
                   /* poster={this.props.url_poster} */
                   onLoadStart={(e) => this.removeControls(e)}
                   onLoadedMetadata={(e) => this.manageVideoDuration(e)}
                   onDurationChange={(e) => this.manageVideoDuration(e)}
                   onTimeUpdate={(e) => this.manageVideoCurrentTime(e)}
                   src={this.props.url_video}
            />
    }
    render() {

        let blocStyles = {
            maxWidth: this.state.maxVideoWidth+"px"
        }

        return <div className="video-cropper">

            <div className="center-block" style={blocStyles}>

                {this.renderVideo()}

                <div className={"video-player"}>

                    <button
                        className={"video-player-control btn btn-pure inline-block"}
                        onClick={() => this.toggleVideo()} >
                        <i className={"fas "+(this.state.videoIsPlaying ? "fa-pause" : "fa-play")} />
                    </button>

                    <div className={"video-player-slider inline-block relative"}>

                        <div className={"absolute absolute-center width-full slider-player "+(this.state.playerVisible ? "" : "hidden")}>
                            <InputRange
                                draggableTrack
                                maxValue={this.state.videoDuration > 0 ? this.state.videoDuration : 0.1}
                                minValue={0}
                                allowSameValues={true}
                                step={0.01}
                                formatLabel={value => this.timeToString(value)}
                                onChangeStart={() => this.toggleVideo(0)}
                                onChange={value => this.setState({player:value})}
                                onChangeComplete={value => this.playerInputChanged(value)}
                                value={this.state.player} />
                        </div>

                        <div className={"absolute absolute-center width-full slider-cropper"}>
                            <InputRange
                                draggableTrack
                                maxValue={this.state.videoDuration > 0 ? this.state.videoDuration : 0.1}
                                minValue={0}
                                allowSameValues={true}
                                step={0.01}
                                formatLabel={value => this.timeToString(value)}
                                onChange={value => this.cropInputChanging(value)}
                                onChangeComplete={value => this.cropInputChanged(value)}
                                value={this.state.timer} />
                        </div>

                    </div>

                </div>

            </div>

            {/*
            <div className={"margin-10 margin-bottom-0"}>

                <InputRange
                    draggableTrack
                    maxValue={this.state.videoDuration > 0 ? this.state.videoDuration : 0.1}
                    minValue={0}
                    allowSameValues={true}
                    step={0.01}
                    formatLabel={value => this.timeToString(value)}
                    onChange={value => this.setState({timer:value})}
                    onChangeComplete={value => this.cropInputChanged(value)}
                    value={this.state.timer} />

                    <div className={"width-full timer-display"}>


                    <span className={"text-left"}>
                        <FormattedMessage id="import.videocrop.time.start" /> : { this.timeToString(this.state.timer.min) }
                    </span>
                        <span className={"text-right"}>
                        <FormattedMessage id="import.videocrop.time.end" /> : { this.timeToString(this.state.timer.max) }
                    </span>


                    </div>

            </div>
            */}

        </div>
    }
}

export default reduxForm({
    form: 'ImportMediaVideoCropperForm'
})(ImportMediaVideoCropper)
