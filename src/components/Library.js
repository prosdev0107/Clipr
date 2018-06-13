import React from 'react'


const Library = ({stickers}) => {

    let images = typeof stickers.img !== "undefined" ? stickers.img : []
    let svg = typeof stickers.svg !== "undefined" ? stickers.svg : []

    return <div className="stickers-library">

        {/* Images */}
        <div className="stickers-library-shelf">
            {images.map((sticker,index) =>
                <div key={index}>
                    <p>{sticker.src}</p>
                </div>
            )}
        </div>

        {/* SVG */}
        <div className="stickers-library-shelf">
            {svg.map((sticker,index) =>
                <div key={index}>
                    <p>{sticker.html}</p>
                </div>
            )}
        </div>

    </div>
}

export default Library
