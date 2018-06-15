import React from 'react'
import Sticker from "./Sticker"
import {StoryStickerTypes,StoryStickerDefaults} from "./propTypes/StoryStickerTypes";

// A draggable, resizable box on storyStickerBoxes

const StorySticker = ({
                             id,
                             sticker,          // What should be displayed inside the box
                             position,         // Current position relative to parent container
                             // edit_info,        // If currently edited by user, information about current modification
                         }) => {

    console.log(id,sticker,position)

    let styles = {
        left:   position.x*100+'%',
        top:    position.y*100+'%',
        width:  position.width*100+'%',
    }

    // paddingTop allows to keep sticker ratio whatever the screen ratio is
    let container_styles = {
        paddingTop: (Math.round(position.ratio*1000)/10)+"%"
    }

    if (typeof position.rotation !== "undefined" && position.rotation != null) {
        styles.transform= "rotate("+position.rotation+"rad)"
    }

    return (
        <div id={id}
             className="story-sticker"
             // className={edit_info.selected ? "story-sticker-box selected" : "story-sticker-box"}
             draggable={true}
             style={styles}
        >

            {/* This sticker container allow us to keep the ratio w/h of the sticker */}
            <div className={"width-100 relative"} style={container_styles}>
                {/* Render box content */}
                <Sticker sticker={sticker}/>
            </div>


            {/* Render rotate symbol on top of box when selected */}
            <div className="rotatable-handle" >
                <div className="rotatable-handle-bar" />
                <div className="rotatable-handle-circle" />
            </div>

            {/* Render 8 "resizable-style" squares around the box when selected */}
            {['nw','ne','sw','se','n','s','e','w'].map((region, i) =>
                <div
                    key={i}
                    data-region={region}
                    className={`resizable-handle resizable-${region}`}
                />
            )}
        </div>
    )
}


StorySticker.propTypes = StoryStickerTypes

StorySticker.defaultProps = StoryStickerDefaults

export default StorySticker
