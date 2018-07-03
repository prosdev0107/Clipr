import React from 'react'
import SimpleStickerContainer from "../containers/SimpleStickerContainer"
import GeneralFormContainer from "../containers/properties/GeneralFormContainer"
import {Row, Col} from 'react-bootstrap'

const Library = ({stickers, stickers_menu_tab, selectFromLibrary, changeTab}) => {

    let images = typeof stickers.img !== "undefined" ? stickers.img : []
    let svg = typeof stickers.svg !== "undefined" ? stickers.svg : []

    // Which category to display ?

    let stickers_to_show = []
    let title = "General"
    switch (stickers_menu_tab) {

        case 1:
            stickers_to_show = images
            title = "Images"
            break
        case 2:
            stickers_to_show = images
            title = "Textes"
            break;
        case 3:
            stickers_to_show = svg
            title = "Animations"
            break
        default:
            break

    }


    const renderLibraryStickers = (stickers_to_show) => {

        if (stickers_to_show.length === 0) {

            {/* Edit general attributes */}
            return <GeneralFormContainer />
        }

        return <div className="stickers-library-shelf padding-20">
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


    /**
     * drag and drop et double click
     * refaire exactement pareil que v0 y a aucune difficulté
     * EN UTILISANT LES BEST PRACTISES
     * C'est le move où il faudra activer des events
     */
    return <div>

        <div className="site-menubar bg-indigo-bottom-500">
            <div className="site-menubar-body">
                <ul className="site-menu">

                    <li className="site-menu-item">
                        <a className={`animsition-link ${ stickers_menu_tab === 0 ? "active" : ""}`} href="javascript:void(0)"
                            onClick={() => changeTab(0)} >
                            <i className="site-menu-icon fa fa-mobile" aria-hidden="true"></i>
                            <span className="site-menu-title">Général</span>
                        </a>
                    </li>


                    <li className="site-menu-item">
                        <a className={`animsition-link ${ stickers_menu_tab === 1 ? "active" : ""}`} href="javascript:void(0)"
                           onClick={() => changeTab(1)} >
                            <i className="site-menu-icon fa fa-image" aria-hidden="true"></i>
                            <span className="site-menu-title">Images</span>
                        </a>
                    </li>


                    <li className="site-menu-item">
                        <a className={`animsition-link ${ stickers_menu_tab === 2 ? "active" : ""}`} href="javascript:void(0)"
                           onClick={() => changeTab(2)} >
                            <i className="site-menu-icon fa fa-font" aria-hidden="true"></i>
                            <span className="site-menu-title">Textes</span>
                        </a>
                    </li>


                    <li className="site-menu-item">
                        <a className={`animsition-link ${ stickers_menu_tab === 3 ? "active" : ""}`}href="javascript:void(0)"
                           onClick={() => changeTab(3)} >
                            <i className="site-menu-icon fa fa-star" aria-hidden="true"></i>
                            <span className="site-menu-title">Animations</span>
                        </a>
                    </li>


                </ul>
            </div>
        </div>


        {/* Preload dashbox image to get ghost image when dragging at first time */}
        <img className="hidden" src="images/dashbox.png" alt="dashbox"/>


        <div className="stickers-library padding-top-20"
             onDragStart={(event) => selectFromLibrary('LIBRARY_STICKER_DRAG_START',event)}
             onDragOver={(event) => selectFromLibrary('EVENT_PREVENT_DEFAULT',event)}
             onDoubleClick={(event) => selectFromLibrary('LIBRARY_STICKER_DOUBLE_CLICK',event)}
        >



            {/* Tab title */}
            <h3 className="text-center text-primary margin-bottom-20">{title}</h3>

            {renderLibraryStickers(stickers_to_show)}

        </div>

    </div>
}

export default Library
