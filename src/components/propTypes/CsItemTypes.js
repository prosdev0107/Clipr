
import PropTypes from 'prop-types'

export let CsItemTypes = PropTypes.shape({
    id: PropTypes.isRequired,
    media: PropTypes.shape({
        src: PropTypes.string.isRequired,
        ext: PropTypes.string.isRequired,
        fullScreen: PropTypes.bool.isRequired,
        isVideo: PropTypes.bool
    })
})

export let CsItemDefaults = {
    media: {
        isVideo: 0
    }
}