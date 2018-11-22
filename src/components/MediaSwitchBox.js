import React from 'react'

const MediaSwitchBox = ({index, selected, cs_item, mediasSwitchBoxAction}) => {

    function renderButtonContent() {

        if (cs_item == null) {
            // That's the "add new media" button
            return <div>
                    <button
                    className={"btn btn-info btn-sm btn-floating "}
                    onClick={(event) => mediasSwitchBoxAction('SHOW_IMPORT_MEDIA_MODAL')}
                >+</button>
            </div>
        }

        return <div className={"media-switchbox-btn-container"}>
            <button
                className={"btn btn-info btn-sm btn-floating "+(selected ? "btn-active" : "")}
                onClick={(event) => mediasSwitchBoxAction('MEDIA_SWITCHER_CHANGE_INDEX',{'new_index': index})}
            >{index+1}</button>
            <button
                className={"btn btn-danger btn-xs btn-floating media-switchbox-delete"}
                onClick={(event) => mediasSwitchBoxAction('MEDIA_SWITCHER_DELETE_MEDIA',{'index': index})}
            >D</button>
        </div>
    }

    return <div className="media-switchbox padding-right-20 padding-left-20">

        { renderButtonContent() }

    </div>
}

export default MediaSwitchBox
