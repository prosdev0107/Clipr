
import PropTypes from 'prop-types'

export let OverlayTypes = PropTypes.shape({
    color: PropTypes.string,
    opacity: PropTypes.number
})

export let OverlayDefaults = {
    color: "#000",
    opacity: 0.3
}
