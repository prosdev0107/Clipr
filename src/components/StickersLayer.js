import React from 'react'
import StoryStickerContainer from '../containers/central/StoryStickerContainer'

const StickersLayer = ({ story_stickers }) => (

    // onDrop is also used when dragging & dropping a sticker into the story
    <div>

        {story_stickers.map((story_sticker,index) =>

            <div key={index}>

                <StoryStickerContainer
                    id = {story_sticker.id}
                />

            </div>
        )}

    </div>
)

export default StickersLayer
