import React from 'react'
import {StickerDefaults,StickerTypes} from "./propTypes/StickerTypes";
// import {customizeStickerOnPage} from '../utilities/DOM/insert_sticker'

const Sticker = ({sticker}) => {

    let {id, type, ratio, source, customize} = sticker
    console.log('REDNER STICKER CONTENT '+id)

    const renderSticker = (id, type, ratio, source, customize)  => {

        switch (type) {

            case 'img':

                return <img src={source.src} alt="sticker"/>

            /*
            // TODO : on dirait que dans une iframe ca veut l'ajouter en top layer
            // => trouver une autre méthode que le document.get... !!
            // ESSAYER DE CREUSER POUR TOUT FAIRE DEPUIS LE COMPONENT
            // D'autre part pas sur qu'on puisse customiser les composants du svg si insérer avec <use> !


            case 'svg':

                // Generate random id
                let randomNb = id + "-" + Math.floor(Math.random() * Math.floor(1000))
                return <svg id={randomNb} onLoad={ customizeStickerOnPage(randomNb, source.css, customize) } viewBox="0 0 100 100">
                        <use xlinkHref={source.svg}></use>
                    </svg> */

            default:
                return <div/>
        }
    }

    return (
        <div draggable={true}
             className="sticker"
             data-component="sticker"
             data-sticker-id={id}
        >

            {renderSticker(id, type, ratio, source, customize)}

        </div>
    )
}

Sticker.propTypes = {
    sticker: StickerTypes
}

Sticker.defaultProps = {
    sticker: StickerDefaults
}


export default Sticker
