import React from 'react'

const MediaSwitchBox = ({index, selected, cs_item, mediasSwitchBoxAction}) => {

    return <div className="media-switchbox padding-right-20 padding-left-20">

        <button
            className={"btn btn-info btn-sm btn-floating "+(selected ? "btn-active" : "")}
            onClick={(event) => mediasSwitchBoxAction('MEDIA_SWITCHER_CHANGE_INDEX',{'new_index': index})}
        >{index+1}</button>

    </div>
}

export default MediaSwitchBox
