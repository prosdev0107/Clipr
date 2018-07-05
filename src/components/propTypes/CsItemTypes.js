
import PropTypes from 'prop-types'

export let CsItemTypes = {
    id: PropTypes.isRequired,
    media: PropTypes.shape({
        src: PropTypes.string.isRequired,
        thumbnail: PropTypes.string,
        ext: PropTypes.string.isRequired,
        isVideo: PropTypes.bool
    })
}

export let CsItemDefaults = {
    media: {
        isVideo: 0
    }
}