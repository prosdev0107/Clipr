
import isEqual from 'lodash/isEqual'

const historyReducer = (state = [], action) => {

    let new_present

    /**
     * Scheme when redo or undo action
     * - Click on undo button fires HISTORY_ASK_UNDO event in reducer
     * - Move state.present to last position of state.future
     *   then last element of state.past to state.present
     *   And pass redoOrUndoAsked to true
     * - TriggerSave() will be instantly triggered
     * - In this method, because redoOrUndoAsked is true
     *   We dispatch a HISTORY_UPDATE_PRESENT event to csItems and clip reducer
     * - csItems and/or clip data changes will trigger LivetimeSave automatically
     * - Because redoOrUndoAsked is true, we won't trigger HISTORY_ADD_NEW_CHANGE
     *   But we will trigger HISTORY_UPDATE_PRESENT_END instead
     *   So that redoOrUndoAsked can be passed to false (ONLY WHEN DATA IS EQUALS TO HISTORY STATE PRESENT)
     */

    switch (action.type) {

        case 'HISTORY_INIT_PRESENT':

            // Just initialize history by adding current state to field "present" without adding element to past or future history
            if (typeof action.data !== "undefined") {
                return {
                    ...state,
                    present: action.data,
                    sendToServer: false
                }
            }
            return state

        case 'HISTORY_ADD_NEW_CHANGE':

            // User made a new change
            if (typeof action.data !== "undefined") {

                // Verify that new change is different
                if (!isEqual(action.data, state.present)) {

                    return {
                        ...state,
                        past: state.past
                            .concat(state.present)  // Pass old present data in past history
                            .slice(-100),           // Track only the last 100 modifications
                        present: action.data,       // Update current history
                        future: [],                 // It's a non-sens to keep future data for redo, as a totally new change broke our history
                        sendToServer: true,
                        redoOrUndoAsked: false
                    }
                }
            }
            return state

        case 'SAVE_MENU_REDO_BTN_PRESSED':

            // User pressed REDO button

            if ((state.future || []).length === 0) {
                // Nothing to redo !
                return state
            }

            // Get future data that should be now passed in present state
            new_present = state.future.slice(-1)[0]

            return {
                ...state,
                past: state.past
                    .concat(state.present),             // Pass old present data in past history
                present: new_present,
                future: state.future.slice(0,-1),       // Remove last element of future history
                sendToServer: true,
                redoOrUndoAsked: true
            }

        case 'SAVE_MENU_UNDO_BTN_PRESSED':

            // User pressed undo button

            if ((state.past || []).length === 0) {
                // Nothing to undo !
                return state
            }

            // Get future data that should be now passed in present state
            new_present = state.past.slice(-1)[0]
            return {
                ...state,
                past: state.past.slice(0,-1),
                present: new_present,
                future: state.future
                    .concat(state.present),               // Pass old present data in past history
                sendToServer: true,
                redoOrUndoAsked: true
            }



        case 'HISTORY_UPDATE_PRESENT_END':

            return {
                ...state,
                sendToServer: false,
                redoOrUndoAsked: false
            }

        case 'API_UPDATE_SAVING':

            return {
                ...state,
                sendToServer: false
            }

        default:
            break
    }


    return state
}

export default historyReducer