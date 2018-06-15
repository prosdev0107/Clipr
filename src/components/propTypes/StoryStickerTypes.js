
import PropTypes from 'prop-types'
import {StickerTypes,StickerDefaults} from './StickerTypes'
import {ItemPositionTypes,ItemPositionDefaults} from './ItemPositionTypes'

export let StoryStickerTypes = {
    id: PropTypes.string.isRequired,
    sticker: StickerTypes.isRequired,
    position: ItemPositionTypes.isRequired
}

export let StoryStickerDefaults = {
    sticker: StickerDefaults,
    position: ItemPositionDefaults
}