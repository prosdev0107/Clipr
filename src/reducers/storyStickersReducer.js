
import {resizeBox, rotateBox} from "../utilities/maths";
import transparent_px from '../images/transparent.png'

let initialBoxPosition = {}

const storyStickersReducer = (state = [], action) => {

    /**
     * Save story sticker coordinated when movement begins
     *
     * @param new_coordinates
     * @param region
     */
    const updateLastPosition = (new_coordinates,region) => {

        initialBoxPosition.x = new_coordinates.x
        initialBoxPosition.y = new_coordinates.y

        if (typeof region !== 'undefined') {
            initialBoxPosition.region = region
        }
    }

    /**
     * Add new sticker to the story
     *
     * @param state
     * @param sticker           // Data of sticker library which allow to build the new story sticker
     * @param position          // Position of cursor in simulator when element is dropped
     * @param corner_position   // Position of cursor relative to top left corner of element when dropped
     * @returns {*}
     */
    const addstorySticker = (state, sticker, position, corner_position) => {

        // Default position (ex : if added by double click)
        let init_width = 0.2
        let SSBox_position = {
            x: 0.5 - init_width/2,
            y: 0.5 - init_width/2,
            width: init_width,
            ratio: sticker.ratio
        }

        // Position in simulator
        if (typeof position !== "undefined" && position != null) {
            SSBox_position.x = position.x
            SSBox_position.y = position.y
            if (typeof corner_position !== "undefined" && corner_position != null) {
                SSBox_position.x -= corner_position.x
                SSBox_position.y -= corner_position.y
            }
        }

        if (typeof sticker.width !== "undefined") {
            SSBox_position.width = sticker.width
        }
        if (typeof sticker.ratio !== "undefined") {
            SSBox_position.ratio = sticker.ratio
        }

        // Add to simulator objects
        if (typeof sticker !== "undefined" && sticker !== null) {

            return [
                ...state, {
                    id: "SSBox_"+(state.length+1),
                    sticker: sticker,
                    position: SSBox_position
                }
            ]
        }

        return state
    }


    /**
     * Move, rotate or resize story sticker after cursor movement
     *
     * @param state
     * @param action
     * @param end_movement      // Flag story sticker as not being transformed anymore
     * @returns {*}
     */
    const tranformStorySticker = (state, action, end_movement) => {

        end_movement = end_movement || false

        // Get aspect ratio of simulator
        let media_panel_ratio = action.media_panel_ratio

        // Get new position of cursor
        let end_pos = action.cursor_position

        // Compute position variation compared to initial state
        let x_delta = end_pos.x - initialBoxPosition.x
        let y_delta = end_pos.y - initialBoxPosition.y

        // Nothing to do if no move, except end movement if asked for
        if (x_delta === 0 && y_delta === 0) {
            return !end_movement ? state : state.map(storySticker =>
                (typeof storySticker.edit_info !== "undefined" && storySticker.edit_info.selected === true)
                    ? {
                        ...storySticker,
                        edit_info: {
                            ...storySticker.edit_info,
                            dragged: false,
                            resized: false,
                            rotated: false
                        }
                    } : storySticker
            )
        }

        // Save new position
        updateLastPosition(end_pos)

        if (typeof initialBoxPosition.region === "undefined" || initialBoxPosition.region === null) {

            // STORY STICKER IS BEING DRAGGED

            // We can't move objects outside simulator
            let margin = 0.1

            // Update the selected SSBox object to fit the new position
            return state.map(storySticker =>
                (typeof storySticker.edit_info !== "undefined" && storySticker.edit_info.translated === true)
                    ? {
                        ...storySticker,
                        position: {
                            ...storySticker.position,
                            // We can't move objects outside simulator
                            x: Math.min(1 - margin, Math.max(margin - storySticker.position.width, storySticker.position.x + x_delta)),
                            y: Math.min(1 - margin, Math.max(margin - media_panel_ratio*storySticker.position.ratio*storySticker.position.width, storySticker.position.y + y_delta))
                        },
                        edit_info: !end_movement ? storySticker.edit_info : {
                            ...storySticker.edit_info,
                            dragged: false,
                            translated: false,
                            rotated: false
                        }
                    } : storySticker
            )

        } else if (initialBoxPosition.region === "rotation") {

            // STORY STICKER IS BEING ROTATED

            // Update box size according to user move
            return state.map(storySticker =>
                (typeof storySticker.edit_info !== "undefined" && storySticker.edit_info.rotated === true)
                    ? {
                        ...storySticker,
                        position: rotateBox(storySticker.position, initialBoxPosition.x, initialBoxPosition.y, x_delta, y_delta, media_panel_ratio)
                    } : storySticker
            )

        } else {

            // STORY STICKER IS BEING RESIZED

            // Update box size according to user move
            return state.map(storySticker =>
                (typeof storySticker.edit_info !== "undefined" && storySticker.edit_info.resized === true)
                    ? {
                        ...storySticker,
                        position: resizeBox(storySticker.position, x_delta, y_delta, initialBoxPosition.region,media_panel_ratio)
                    } : storySticker
            )
        }
    }


    switch (action.type) {

        /******************/
        /* INITIALIZATION */
        /******************/

        case 'API_UPDATE_CS_ITEM':

            let data = action.data
            if (typeof data.id !== "undefined" && typeof data.template !== "undefined" && typeof data.template.story_stickers !== "undefined") {

                return data.template.story_stickers
            }
            return state


        /*******************/
        /* PREVENT DEFAULT */
        /*******************/

        case 'EVENT_PREVENT_DEFAULT':

            // Prevent things like image opening
            action.event.preventDefault()

            return state

        /*********************/
        /* PICK FROM LIBRARY */
        /*********************/

        case 'LIBRARY_STICKER_DRAG_START':


            // Set initial position of cursor in data transfer
            // Also save info about sticker content
            action.event.dataTransfer.setData('pick_from_library',JSON.stringify({
                cursor_corner_position: action.cursor_corner_position,
                elementId: action.target.id,
                sticker: action.sticker
            }))

            return state

        case 'LIBRARY_STICKER_DOUBLE_CLICK':

            return addstorySticker(state, action.sticker)

        /*********************************/
        /* STORY STICKER START SELECTION */
        /*********************************/

        // From library : start dragging sticker
        case 'STICKERS_LAYER_DRAG_START':

            // Useless but needed to let onDragOver be triggered
            action.event.dataTransfer.setData('text',null)

            // Set a transparent image as ghost image when dragging,
            // because we are already moving original element at the same time
            var img = document.createElement("img")
            img.src = transparent_px.src
            action.event.dataTransfer.setDragImage(img, 0, 0)

            // Update objects of simulator to declare which one is currently being dragged
            return state.map(storySticker =>
                (storySticker.id === action.target.id)
                    ? {
                        ...storySticker,
                        edit_info: {
                            ...storySticker.edit_info,
                            translated: true
                        }
                    } : storySticker
            )


        // From stickers layer : declare the story sticker as now selected
        case 'STICKERS_LAYER_MOUSE_DOWN':

            // Save initial position of SSBox
            updateLastPosition(action.cursor_position,action.region)

            // Flag box as selected if click inside, with movement type (if we selected a rotate or resize handler)
            // Else reinit box (click outside the box
            return state.map(storySticker =>
                (storySticker.id === action.target.id)
                    ? {
                        ...storySticker,
                        edit_info: {
                            ...storySticker.edit_info,
                            selected: true,
                            resized: action.moveType === "resize",
                            rotated: action.moveType === "rotate"
                        }
                    } : {
                        ...storySticker,
                        edit_info: {
                            ...storySticker.edit_info,
                            selected: false,
                            resized: false,
                            rotated: false,
                            translated: false
                        }
                    }
            )

        /***************************/
        /* STORY STICKER TRANSFORM */
        /***************************/

        // Resize, rotate or translate the story sticker
        case 'STICKERS_LAYER_DRAGGED':

            action.event.preventDefault()

            return tranformStorySticker(state, action)

        /*******************************/
        /* STORY STICKER END SELECTION */
        /*******************************/

        /*case 'STICKERS_LAYER_MOUSE_END':

            // Prevent things like image opening
            action.event.preventDefault()

            // Prevent dragging or resizing from outside the box
            return state.map(storySticker =>
                (typeof storySticker.edit_info !== "undefined" && storySticker.edit_info.selected === true)
                    ? {
                        ...storySticker,
                        edit_info: {
                            ...storySticker.edit_info,
                            translated: false,
                            resized: false,
                            rotated: false
                        }
                    } : storySticker
            )*/

        case 'STICKERS_LAYER_ON_DROP':

            action.event.preventDefault()

            // If just dropped a sticker from library, add it to story
            if (typeof action.event.dataTransfer !== "undefined") {
                let elmtDroppedInfoJSON = action.event.dataTransfer.getData('pick_from_library')
                if (elmtDroppedInfoJSON != null && elmtDroppedInfoJSON.length > 0) {
                    let elmtDroppedInfo = JSON.parse(elmtDroppedInfoJSON)
                    if (elmtDroppedInfo != null && typeof elmtDroppedInfo.elementId !== "undefined") {

                        // Yes it is, add sticker to story stickers
                        return addstorySticker(
                            state,
                            elmtDroppedInfo.sticker,
                            action.cursor_position,
                            elmtDroppedInfo.cursor_corner_position
                        )
                    }
                }
            }

            // Whatever the dropped element is, its movement ends so must flag as currently not moving
            // Also need to finish transformation of the box (ex : case mouse leave)
            return tranformStorySticker(state, action, true)

        /*********************************/
        /* PROPERTIES EDIT STORY STICKER */
        /*********************************/

        case 'PROPERTIES_FORM_CHANGED':

            const editObjectFromForm = (initialState, inputName, inputValue) => {

                // First need to deep copy the original object
                // Else we would modify directly the state itself
                // Which is an anti-pattern, React would consider state hasn't changed so no re-rendering

                if (inputName.indexOf('position_') === 0) {

                    let position = JSON.parse(JSON.stringify(initialState.position))

                    switch (inputName) {

                        case "position_x":
                            position.x = parseFloat(inputValue)
                            break
                        case "position_y":
                            position.y = parseFloat(inputValue)
                            break
                        case "position_rotation":
                            position.rotation = parseFloat(inputValue)*Math.PI/180
                            break
                        default:
                            break
                    }

                    return {
                        ...initialState,
                        position: position
                    }

                } else if (inputName.indexOf('sticker_') === 0) {

                    let sticker = JSON.parse(JSON.stringify(initialState.sticker))

                    switch (inputName) {

                        case "text":
                            sticker.text = inputValue
                            break
                        case "fontFamily":
                            sticker.fontFamily = inputValue
                            break
                        case "fontSize":
                            sticker.fontSize = parseInt(inputValue, 10)
                            break
                        case "color":
                            sticker.color = inputValue
                            break
                        default:
                            // That could be a custom field
                            if (typeof sticker.customize !== "undefined"
                                && typeof sticker.customize[inputName] !== "undefined") {
                                sticker.customize[inputName].value = inputValue
                            }

                            break
                    }

                    return {
                        ...initialState,
                        sticker: sticker
                    }

                } else {
                    return initialState
                }
            }

            return state.map(storySticker =>
                (typeof storySticker.edit_info === "undefined" || !storySticker.edit_info.selected) ?
                    storySticker : editObjectFromForm(storySticker, action.name, action.value)
            )

        // Remove the current selected story sticker
        case 'PROPERTIES_BUTTON_REMOVE_SELECTED':

            return state.filter(storySticker => (typeof storySticker.edit_info === "undefined" || !storySticker.edit_info.selected))

        default:
            return state
    }
}

export default storyStickersReducer