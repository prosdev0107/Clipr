import React from 'react'
import StoryStickerContainer from '../containers/central/StoryStickerContainer'
import {isSafari} from 'react-device-detect';

const StickersLayer = ({ story_stickers, listen_drag_events, transformStorySticker, sendToReducers }) => {

    // Listen to drag over events only when one item starts to be dragged
    let onDragOverDo = listen_drag_events && !isSafari ? (event) => transformStorySticker('STICKERS_LAYER_DRAGGED',event) : (event) => transformStorySticker('EVENT_PREVENT_DEFAULT',event)
    let onMouseMoveDo = listen_drag_events && isSafari ? (event) => transformStorySticker('STICKERS_LAYER_DRAGGED',event) : null
    let onDropDo = listen_drag_events ? (event) => transformStorySticker('STICKERS_LAYER_ON_DROP',event) : null

    let onKeyDownDo = listen_drag_events ? null : (event) => sendToReducers('STICKERS_LAYER_ON_KEYDOWN',event.which)

    // onDrop is also used when dragging & dropping a sticker into the story
    return <div

        onMouseDown={(event) => transformStorySticker('STICKERS_LAYER_MOUSE_DOWN',event)}
        onDragStart={(event) => transformStorySticker('STICKERS_LAYER_DRAG_START',event)}

        // Only one of the two followings will be triggered, depending on the browser
        onDragOver={onDragOverDo}
        onMouseMove={onMouseMoveDo}

        onMouseUp={onDropDo}
        onMouseLeave={onDropDo}
        onDrop={onDropDo}

        onKeyDown={onKeyDownDo}
        tabIndex="0"

        className="width-full height-full"
    >

        {story_stickers.map((story_sticker,index) =>
            <div key={index}>

                <StoryStickerContainer
                    id = {story_sticker.id}
                />

            </div>
        )}

    </div>
}

export default StickersLayer
