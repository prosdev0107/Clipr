import React from 'react'
import MediaSwitchBoxContainer from '../containers/central/MediaSwitchBoxContainer'
import DragSortableList from 'react-drag-sortable'

class MediasSwitcher extends React.Component {

    state = {
        is_dragging_media: false,
        is_delete_button_hovered: false
    }

    // Is element 1 dragged over element 2 ?
    // Yes if middle of box 1 is inside box 2
    areBoxesOverlapped(elmt1, elmt2) {

        let box1 = elmt1.getBoundingClientRect()
        let box2 = elmt2.getBoundingClientRect()

        let box1MiddleX = box1.left + box1.width/2
        let box1MiddleY = box1.top + box1.height/2

        return box1MiddleX > box2.left && box1MiddleX < ( box2.left + box2.width )
        && box1MiddleY > box2.top && box1MiddleY < ( box2.top + box2.height )
    }

    onMediaDragged(event) {

        // Get element dragged
        let mediaDragged = event.target

        // Get delete button element
        let trashButton =  document.getElementById("DELETE_MEDIA_BUTTON")

        // Make trash button appeared
        if (!trashButton.classList.contains('media-dragged')) {
            trashButton.classList.add('media-dragged')
        }

        // Is user dragging media above hidden trash button ?
        if (this.areBoxesOverlapped(mediaDragged,trashButton)) {
            // We don't use locale state here, as rendering breaks drag movement
            trashButton.classList.add('media-hovers-button')
            trashButton.classList.add('btn-active')
        } else {
            trashButton.classList.remove('media-hovers-button')
            trashButton.classList.remove('btn-active')
        }
    }

    onMediaDragEnds() {

        // Make trash button disappeared
        let trashButton =  document.getElementById("DELETE_MEDIA_BUTTON")
        trashButton.classList.remove('media-dragged')
        trashButton.classList.remove('media-hovers-button')
    }

    // When user drops media
    onSort(sortedList, dropEvent) {

        let trashButton =  document.getElementById("DELETE_MEDIA_BUTTON")
        this.onMediaDragEnds() // Not fired automatically if element was dragged

        let mediaDragged = dropEvent.target

        // Is user dragging media above hidden trash button ?
        if (this.areBoxesOverlapped(mediaDragged,trashButton)) {

            // Yes, means user asks to remove media


            // Index of media to removed ?
            let indexToRemove = parseInt(mediaDragged.querySelector('.media-switchbox-container').getAttribute("data-index"),0)

            // Remove media
            console.log({
                index: indexToRemove,
                items_length: sortedList.length
            })
            this.props.sendToReducers("MEDIA_SWITCHER_DELETE_MEDIA",{
                index: indexToRemove,
                items_length: sortedList.length
            })

        } else {

            // No, simply change media order

            // Get new ordered cs items data
            let new_cs_items = []
            let new_cs_item_index_editing = this.props.cs_item_index_editing;
            sortedList.forEach((elmt,index) => {
                new_cs_items.push(elmt.data)
                if (elmt.currently_selected) {
                    // If the media currently edited seen its position changed in the sortable list,
                    // We must update cs_item_index_editing state so user will still see the same edited media
                    new_cs_item_index_editing = index
                }
            })

            // Send to reducers
            this.props.sendToReducers("API_UPDATE_CS_ITEMS",new_cs_items)
            if (this.props.cs_item_index_editing !== new_cs_item_index_editing) {
                this.props.sendToReducers("MEDIA_SWITCHER_CHANGE_INDEX",{
                    new_index: new_cs_item_index_editing
                })
            }
        }

    }

    render() {

        let placeholder = <div
            className={"media-switchbox-container"}
        >
            <MediaSwitchBoxContainer
                cs_item={null}
                selected={-1}
            />
        </div>

        let medias_sortable_list = this.props.cs_items.map((cs_item,index) => {

            return {
                content: <div
                    key={index} className={"media-switchbox-container"}
                    onMouseMove={(event) => this.onMediaDragged(event)}
                    onMouseUp={(event) => this.onMediaDragEnds(event)}
                    data-index={index}
                >
                    <MediaSwitchBoxContainer
                        index={index}
                        cs_item={cs_item}
                        selected={index === this.props.cs_item_index_editing}
                    />
                </div>,
                position: index,
                data: cs_item,
                currently_selected: index === this.props.cs_item_index_editing
            }
        })

        // First render as many buttons as number of medias
        // Then add "add new media" button
        return <div
            className="medias-switcher absolute-center-horizontal"
        >

            {/* The sortable list of media buttons */}
            <DragSortableList
                items={medias_sortable_list}
                placeholder={placeholder}
                onSort={(sortedList, dropEvent) => this.onSort(sortedList, dropEvent)}
                dropBackTransitionDuration={0.3}
                type="horizontal"/>

            {/* Add media button */}
            <div className={"media-switchbox-container media-switchbox-add"}>

                <MediaSwitchBoxContainer
                    cs_item={null}
                    selected={0}
                />

            </div>


            {/* Delete media button */}
            <button
                id={"DELETE_MEDIA_BUTTON"}
                className={
                        "btn btn-danger btn-floating media-switchbox-delete "
                        + (this.state.is_delete_button_hovered ? " media-hovers-button " : "")
                        + (this.state.is_dragging_media ? " media-dragged " : "")
                    }
            >
                <i className={"icon fa fa-trash"} />
            </button>

        </div>
    }


}

export default MediasSwitcher
