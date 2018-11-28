import React from 'react'
import MediaSwitchBoxContainer from '../containers/central/MediaSwitchBoxContainer'
import DragSortableList from 'react-drag-sortable'

const MediasSwitcher = ({cs_items, cs_item_index_editing, sendToReducers}) => {

    // First render as many buttons as number of medias
    // Then add "add new media" button

    const onSort = (sortedList) => {

        // Get new ordered cs items data
        let new_cs_items = []
        let new_cs_item_index_editing = cs_item_index_editing;
        sortedList.forEach((elmt,index) => {
            new_cs_items.push(elmt.data)
            if (elmt.currently_selected) {
                // If the media currently edited seen its position changed in the sortable list,
                // We must update cs_item_index_editing state so user will still see the same edited media
                new_cs_item_index_editing = index
            }
        })

        // Send to reducers
        sendToReducers("API_UPDATE_CS_ITEMS",new_cs_items)
        if (cs_item_index_editing !== new_cs_item_index_editing) {
            sendToReducers("MEDIA_SWITCHER_CHANGE_INDEX",{
                new_index: new_cs_item_index_editing
            })
        }
    }

    let placeholder = <div className={"media-switchbox-container"}>
            <MediaSwitchBoxContainer
            cs_item={null}
            selected={-1}
        />
    </div>

    let medias_sortable_list = cs_items.map((cs_item,index) => {

        return {
            content: <div key={index} className={"media-switchbox-container"}>
                <MediaSwitchBoxContainer
                    index={index}
                    cs_item={cs_item}
                    selected={typeof cs_item_index_editing !== "undefined" ? index === cs_item_index_editing : 0}
                />
            </div>,
            position: index,
            data: cs_item,
            currently_selected: cs_item_index_editing === index
        }
    })

    return <div className="medias-switcher absolute-center-horizontal">


        <DragSortableList
            items={medias_sortable_list}
            placeholder={placeholder}
            onSort={(sortedList) => onSort(sortedList)}
            dropBackTransitionDuration={0.3}
            type="horizontal"/>

        <div className={"media-switchbox-container"}>

            <MediaSwitchBoxContainer
                cs_item={null}
                selected={0}
            />

        </div>

    </div>
}

export default MediasSwitcher
