
const listenDragEventsReducer = (state = [], action) => {

    switch (action.type) {


        case 'LIBRARY_STICKER_DRAG_START':

            // A sticker start to be dragged from library : we need to listen drag over events
            return true

        case 'STICKERS_LAYER_DRAG_START':

            // A sticker start to be dragged into the stickers layer
            return true

        case 'STICKERS_LAYER_MOUSE_DOWN':

            // A sticker start to be selected into the stickers layer
            return true

        case 'STICKERS_LAYER_ON_DROP':

            // Stop listening drag over events
            return false

        default:
            return state
    }
}

export default listenDragEventsReducer