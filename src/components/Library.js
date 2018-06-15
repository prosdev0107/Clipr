import React from 'react'
import LibraryStickerContainer from "../containers/library/LibraryStickerContainer"
import {Row, Col} from 'react-bootstrap'

const Library = ({stickers}) => {

    let images = typeof stickers.img !== "undefined" ? stickers.img : []
    let svg = typeof stickers.svg !== "undefined" ? stickers.svg : []

    return <div className="stickers-library">

        {/* Images */}
        <div className="stickers-library-shelf">
            <Row>
                {images.map((sticker,index) =>
                    <Col
                        key={index}
                        sm={4}>
                        <div className={"width-full relative"} style={ {paddingTop: (Math.min(100,Math.round(sticker.ratio*1000)/10))+"%" } }>
                            <LibraryStickerContainer sticker={ {...sticker, type: "img"} } />
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
                            <LibraryStickerContainer sticker={ {...sticker, type: "svg"} } />
                        </div>
                    </Col>
                )}
            </Row>
        </div>

    </div>
}

export default Library
