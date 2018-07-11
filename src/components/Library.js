import React from 'react'
import {isSafari} from 'react-device-detect'
import LeftMenuContainer from "../containers/library/LeftMenuContainer"
import LibraryContentContainer from "../containers/library/LibraryContentContainer"
import GiphySearchContainer from "../containers/library/SearchAPIBarContainer"

const Library = ({stickers, stickers_menu_tab, listen_drag_events, selectFromLibrary, loadMoreStickers}) => {

    let onDragOverDo = listen_drag_events && !isSafari ? (event) => selectFromLibrary('EVENT_PREVENT_DEFAULT',event) : null

    // Render a search bar to search through Image API
    const renderSearchBar = (stickers_menu_tab) => {

        if (stickers_menu_tab === 4 || stickers_menu_tab === 1) {
            return <GiphySearchContainer />
        }

        return <div/>
    }

    const handleScroll = (event) => {

        let scrollTop = event.target.scrollTop
        let libraryHeight = event.target.offsetHeight
        let scrollHeight = event.target.scrollHeight

        let scrolledToBottom = Math.ceil(scrollTop + libraryHeight + 50) >= scrollHeight;

        if (scrolledToBottom) {
            loadMoreStickers()
        }
    }

    let hide_column = stickers_menu_tab === 0 ? "animate-hide-left" : ""
    return <div>

        {/* Left sidebar menu to switch from stickers category */}
        <LeftMenuContainer />

        {/* Preload dashbox image to get ghost image when dragging at first time */}
        <img className="hidden" src="images/dashbox.png" alt="dashbox"/>

        {/* Stickers container */}
        <div className={"stickers-library-container"} >
            <div className={"stickers-library animate-left "+hide_column}
                 onDragStart={(event) => selectFromLibrary('LIBRARY_STICKER_DRAG_START',event)}
                 onDragOver={onDragOverDo}
                 onDoubleClick={(event) => selectFromLibrary('LIBRARY_STICKER_DOUBLE_CLICK',event)}
                 onScroll={(event) => handleScroll(event)}
            >
                {/* Search tool dedicated to the selected stickers category */}
                {renderSearchBar(stickers_menu_tab)}

                {/* Stickers found for that search */}
                <LibraryContentContainer />

            </div>
        </div>

    </div>
}

export default Library
