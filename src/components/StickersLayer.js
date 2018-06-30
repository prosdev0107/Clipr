import React from 'react'
import StoryStickerContainer from '../containers/central/StoryStickerContainer'

const StickersLayer = ({ story_stickers, listen_drag_events, transformStorySticker }) => {

    // Listen to drag over events only when one item starts to be dragged
    let onDragOverDo = listen_drag_events ? (event) => transformStorySticker('STICKERS_LAYER_DRAGGED',event) : null
    // let onMouseMoveDo = listen_drag_events ? (event) => transformStorySticker('STICKERS_LAYER_DRAGGED',event) : null
    let onDropDo = listen_drag_events ? (event) => transformStorySticker('STICKERS_LAYER_ON_DROP',event) : null

    // onDrop is also used when dragging & dropping a sticker into the story
    return <div

        onMouseDown={(event) => transformStorySticker('STICKERS_LAYER_MOUSE_DOWN',event)}
        onDragStart={(event) => transformStorySticker('STICKERS_LAYER_DRAG_START',event)}

        onDragOver={onDragOverDo}
        // onMouseMove={onMouseMoveDo}

        onMouseUp={onDropDo}
        onMouseLeave={onDropDo}
        onDrop={onDropDo}

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
