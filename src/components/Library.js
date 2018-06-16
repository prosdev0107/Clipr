import React from 'react'
import SimpleStickerContainer from "../containers/SimpleStickerContainer"
import {Row, Col} from 'react-bootstrap'

const Library = ({stickers, selectFromLibrary}) => {

    let images = typeof stickers.img !== "undefined" ? stickers.img : []
    let svg = typeof stickers.svg !== "undefined" ? stickers.svg : []

    /**
     * drag and drop et doublic clicl
     * refaire exactement pareil que v0 y a aucune difficulté
     * EN UTILISANT LES BEST PRACTISES
     * C'est le move où il faudra activer des events
     */

    return <div className="stickers-library"
                onDragStart={(event) => selectFromLibrary('LIBRARY_STICKER_DRAG_START',event)}
                onDragOver={(event) => selectFromLibrary('EVENT_PREVENT_DEFAULT',event)}
                onDoubleClick={(event) => selectFromLibrary('LIBRARY_STICKER_DOUBLE_CLICK',event)}
    >

        {/* Images */}
        <div className="stickers-library-shelf">
            <Row>
                {images.map((sticker,index) =>
                    <Col
                        key={index}
                        sm={4}>
                        <div className={"width-full relative"} style={ {paddingTop: (Math.min(100,Math.round(sticker.ratio*1000)/10))+"%" } }>
                            <SimpleStickerContainer sticker={sticker} />
                        </div>
                    </Col>
                )}
            </Row>
        </div>

        {/* SVG */}
        <div className="stickers-library-shelf">
            <Row>
                {svg.map((sticker,index) =>
                    <Col
                        key={index}
                        sm={4}>
                        <div className={"width-full relative"} style={ {paddingTop: (Math.min(100,Math.round(sticker.ratio*1000)/10))+"%" } }>
                            <SimpleStickerContainer sticker={sticker} />
                        </div>
                    </Col>
                )}
            </Row>
        </div>

    </div>
}

export default Library
