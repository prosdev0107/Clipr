import React from 'react'
import SimpleStickerContainer from "../containers/SimpleStickerContainer"
import {Row, Col} from 'react-bootstrap'

const LibraryContent = ({tab,stickers, is_loading_stickers}) => {

    let stickers_to_show = []

    switch (tab) {

        case 1:
            stickers_to_show =  typeof stickers.pixabay !== "undefined" ? stickers.pixabay : []
            break
        case 2:
            stickers_to_show = typeof stickers.text !== "undefined" ? stickers.text : []
            break;
        case 3:
            stickers_to_show = typeof stickers.svg !== "undefined" ? stickers.svg : []
            break
        case 4:
            stickers_to_show = typeof stickers.giphy !== "undefined" ? stickers.giphy : []
            break
        default:
            break
    }

    if (stickers_to_show.length === 0) {

        // Empty
        return <div>
            <p className="text-center margin-top-50">
                { is_loading_stickers ? "Loading..." : "Aucun contenu trouvé !" }
                </p>
        </div>
    }

    return <div className="stickers-library-shelf height-full padding-20">
        <Row>
            {stickers_to_show.map((sticker,index) =>
                <Col
                    key={index}
                    lg={tab === 2 ? 12 : 4}
                    sm={tab === 2 ? 12 : 6}
                    className={"padding-5 "+(tab === 2 ? "col-xlg-6" : "col-xlg-3")}
                >
                    <div className="library-sticker-container width-full relative">
                        <div className={"width-full relative"} style={ {paddingTop: (Math.min(100,Math.round(sticker.ratio*1000)/10))+"%" } }>
                            <SimpleStickerContainer sticker={sticker} />
                        </div>
                    </div>

                </Col>
            )}
        </Row>

        <p className="text-center margin-30">
            { is_loading_stickers ? "Loading..." : "" }
        </p>

    </div>
}

export default LibraryContent
