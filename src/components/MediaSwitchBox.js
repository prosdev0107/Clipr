import React from 'react'

const MediaSwitchBox = ({index, selected, cs_item, cs_items_length, mediasSwitchBoxAction}) => {

    function renderButtonContent() {

        if (cs_item === null) {

            if ( selected === -1 ){

                // That's the placeholder when dragging element
                return <div className={"media-switchbox-btn-container"}>
                    <button>
                        <div className={"overlay absolute"}>
                        </div>

                    </button>
                </div>

            }

            // That's the "add new media" button
            return <div className={"media-switchbox-btn-container"}>
                <button
                    onClick={(event) => mediasSwitchBoxAction('SHOW_IMPORT_MEDIA_MODAL')}
                >
                    <div className={"overlay absolute"}>
                        <span className={"absolute absolute-center"}>+</span>
                    </div>

                </button>
            </div>
        }

        return <div className={"media-switchbox-btn-container"}>

            <button
                className={selected ? "relative btn-active" : "relative"}
                onClick={(event) => mediasSwitchBoxAction('MEDIA_SWITCHER_CHANGE_INDEX',{
                    new_index: index
                })}
            >
                <img className={"absolute absolute-center"} src={cs_item.media.thumbnail} alt={"preview media panel"} />
                <div className={"overlay absolute"}>
                    <span className={"absolute absolute-center"}>{index+1}</span>
                </div>
            </button>

        </div>
    }

    return <div className="media-switchbox">

        { renderButtonContent() }

    </div>
}

export default MediaSwitchBox
