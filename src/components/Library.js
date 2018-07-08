import React from 'react'
import SimpleStickerContainer from "../containers/SimpleStickerContainer"
import {Row, Col} from 'react-bootstrap'
import {isSafari} from 'react-device-detect'
import GiphySearchBarContainer from "../containers/library/GiphySearchBarContainer"

const Library = ({stickers, stickers_menu_tab, listen_drag_events, selectFromLibrary, changeTab}) => {

    let images = typeof stickers.img !== "undefined" ? stickers.img : []
    let texts = typeof stickers.text !== "undefined" ? stickers.text : []
    let svg = typeof stickers.svg !== "undefined" ? stickers.svg : []
    let giphy_stickers = typeof stickers.giphy_stickers !== "undefined" ? stickers.giphy_stickers : []

    let onDragOverDo = listen_drag_events && !isSafari ? (event) => selectFromLibrary('EVENT_PREVENT_DEFAULT',event) : null

    // Which category to display ?
    let stickers_to_show = []
    switch (stickers_menu_tab) {

        case 1:
            stickers_to_show = images
            break
        case 2:
            stickers_to_show = texts
            break;
        case 3:
            stickers_to_show = svg
            break
        case 4:
            stickers_to_show = giphy_stickers
            break
        default:
            break

    }

    // Render a search bar to search through Image API
    const renderSearchBar = (stickers_menu_tab) => {

        switch (stickers_menu_tab) {

            case 4:
                return <GiphySearchBarContainer />

            default:
                return <div/>
        }
    }

    const renderLibraryStickers = (stickers_to_show) => {

        if (stickers_to_show.length === 0) {

            // Edit general attributes
            return <div></div>
        }

        return <div className="stickers-library-shelf height-full padding-20">
            <Row>
                {stickers_to_show.map((sticker,index) =>
                    <Col
                        key={index}
                        lg={4}
                        xs={6}
                        className="padding-5"
                    >
                        <div className="library-sticker-container width-full relative">
                            <div className={"width-full relative"} style={ {paddingTop: (Math.min(100,Math.round(sticker.ratio*1000)/10))+"%" } }>
                                <SimpleStickerContainer sticker={sticker} />
                            </div>
                        </div>

                    </Col>
                )}
            </Row>
        </div>
    }

    const handleScroll = (event) => {

        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {

        }
    }

    let hide_column = stickers_menu_tab === 0 ? "animate-hide-left" : ""
    return <div>

        <div className="site-menubar">
            <div className="site-menubar-body">
                <ul className="site-menu">

                    <li className="site-menu-item">
                        <a className={`animsition-link ${ stickers_menu_tab === 0 ? "active" : ""}`} href=""
                           onClick={(e) => {e.preventDefault();changeTab(0);}} >
                            <i className="site-menu-icon fa fa-mobile" aria-hidden="true"></i>
                            <span className="site-menu-title">Général</span>
                        </a>
                    </li>


                    <li className="site-menu-item">
                        <a className={`animsition-link ${ stickers_menu_tab === 1 ? "active" : ""}`} href=""
                           onClick={(e) => {e.preventDefault();changeTab(1);}} >
                            <i className="site-menu-icon fa fa-image" aria-hidden="true"></i>
                            <span className="site-menu-title">Images</span>
                        </a>
                    </li>


                    <li className="site-menu-item">
                        <a className={`animsition-link ${ stickers_menu_tab === 2 ? "active" : ""}`} href=""
                           onClick={(e) => {e.preventDefault();changeTab(2);}} >
                            <i className="site-menu-icon fa fa-font" aria-hidden="true"></i>
                            <span className="site-menu-title">Textes</span>
                        </a>
                    </li>


                    <li className="site-menu-item">
                        <a className={`animsition-link ${ stickers_menu_tab === 3 ? "active" : ""}`} href=""
                           onClick={(e) => {e.preventDefault();changeTab(3);}} >
                            <i className="site-menu-icon fa fa-star" aria-hidden="true"></i>
                            <span className="site-menu-title">Animations</span>
                        </a>
                    </li>


                    <li className="site-menu-item">
                        <a className={`animsition-link ${ stickers_menu_tab === 4 ? "active" : ""}`} href=""
                           onClick={(e) => {e.preventDefault();changeTab(4);}} >
                            <i className="site-menu-icon fa fa-star" aria-hidden="true"></i>
                            <span className="site-menu-title">Gifs</span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>


        {/* Preload dashbox image to get ghost image when dragging at first time */}
        <img className="hidden" src="images/dashbox.png" alt="dashbox"/>

        <div className={"stickers-library-container"}>
            <div className={"stickers-library animate-left "+hide_column}
                 onDragStart={(event) => selectFromLibrary('LIBRARY_STICKER_DRAG_START',event)}
                 onDragOver={onDragOverDo}
                 onDoubleClick={(event) => selectFromLibrary('LIBRARY_STICKER_DOUBLE_CLICK',event)}
            >

                {renderSearchBar(stickers_menu_tab)}

                {renderLibraryStickers(stickers_to_show)}

            </div>
        </div>

    </div>
}

export default Library
