
import {MEDIA_PANEL_REF_WIDTH} from "../constants/constants"

/**
 * Compute angle between vector AB and AC (given ref_point as A)
 * Return angle in RADIAN
 *
 * @param ref_point
 * @param B
 * @param C
 * @returns {number}
 */
export const find_vector_angle = (ref_point,B,C) => {

    // Translate to a (0,0) ref point
    B.x -= ref_point.x
    B.y -= ref_point.y
    C.x -= ref_point.x
    C.y -= ref_point.y

    // Compute angle
    return Math.round(1000*(Math.atan2(C.y, C.x) - Math.atan2(B.y, B.x)))/1000
}


/**
 * Resize story sticker after a mouse movement
 * 
 * @param initialCoord          // Initial coord of story sticker
 * @param x_delta               // The x-diff between cursor end and begin positions
 * @param y_delta               // The y-diff between cursor end and begin positions
 * @param region                // Which of the 8 resize handler has been selected ?
 * @param media_panel_ratio     // media_panel height/width 
 * @returns {*}
 */
export const resizeBox = (initialCoord, x_delta, y_delta, region, media_panel_ratio) => {

    // The method consists in defining the new position of the 4 corners of the box
    // Depending on delta move and region selected
    // And relative to Media Panel dimensions
    let box_corners = {
        nw: {
            x: initialCoord.x,
            y: initialCoord.y
        },
        ne: {
            x: initialCoord.x+initialCoord.width,
            y: initialCoord.y
        },
        sw: {
            x: initialCoord.x,
            y: initialCoord.y+initialCoord.ratio*initialCoord.width/media_panel_ratio
        },
        se: {
            x: initialCoord.x+initialCoord.width,
            y: initialCoord.y+initialCoord.ratio*initialCoord.width/media_panel_ratio
        },
    }

    // The delta made by user is applied to the ROTATED object
    // In order to get the new position of corners WITHOUT rotation,
    // We need to anti-rotate the delta vector
    let anti_rotation = -initialCoord.rotation || 0
    let ang_cos = Math.cos(anti_rotation)
    let ang_sin = Math.sin(anti_rotation)
    let anti_rotated_x_delta = -y_delta*ang_sin + x_delta*ang_cos
    let anti_rotated_y_delta = y_delta*ang_cos + x_delta*ang_sin

    // Also, the center of the box will move along the resize movement
    // So we need to translate each corner into that direction
    // In case of n w s e resizable-handle, we should cancel one of the two components of anti-rotated delta vector
    if (region === "n" || region === "s") {
        anti_rotated_x_delta = 0
    }
    if (region === "w" || region === "e") {
        anti_rotated_y_delta = 0
    }
    ang_cos = Math.cos(initialCoord.rotation || 0)
    ang_sin = Math.sin(initialCoord.rotation || 0)
    // So let's compute the "real" delta vector, which will allow to move the center of the box
    let real_delta = {
        x: -anti_rotated_y_delta*ang_sin + anti_rotated_x_delta*ang_cos,
        y: anti_rotated_y_delta*ang_cos + anti_rotated_x_delta*ang_sin
    }

    // Now we can update each corner position
    // by applying the anti rotated delta vector to each one of the corners
    // (i.e. fit to new box dimensions, KEEPING THE OLD CENTER)
    // and finally by translating them respecting the box center translation (given by center_delta)
    // (i.e. fit to new box position, KEEPING THE NEW DIMENSIONS)
    if (['nw','w','n','sw'].indexOf(region) >= 0) {
        // Move left border to the half distance of anti_rotated_x_delta
        box_corners.nw.x += (anti_rotated_x_delta + real_delta.x)/2
        box_corners.sw.x += (anti_rotated_x_delta + real_delta.x)/2
        // Move right border to the half distance of anti_rotated_x_delta
        box_corners.ne.x += (- anti_rotated_x_delta + real_delta.x)/2
        box_corners.se.x += (- anti_rotated_x_delta + real_delta.x)/2
    }
    if (['nw','w','n','ne'].indexOf(region) >= 0) {
        box_corners.nw.y += (anti_rotated_y_delta + real_delta.y)/2
        box_corners.ne.y += (anti_rotated_y_delta + real_delta.y)/2
        box_corners.sw.y += (- anti_rotated_y_delta + real_delta.y)/2
        box_corners.se.y += (- anti_rotated_y_delta + real_delta.y)/2
    }
    if (['se','s','e','ne'].indexOf(region) >= 0) {
        box_corners.nw.x += (- anti_rotated_x_delta + real_delta.x)/2
        box_corners.sw.x += (- anti_rotated_x_delta + real_delta.x)/2
        box_corners.ne.x += (anti_rotated_x_delta + real_delta.x)/2
        box_corners.se.x += (anti_rotated_x_delta + real_delta.x)/2
    }
    if (['se','s','e','sw'].indexOf(region) >= 0) {
        box_corners.nw.y += (- anti_rotated_y_delta + real_delta.y)/2
        box_corners.ne.y += (- anti_rotated_y_delta + real_delta.y)/2
        box_corners.sw.y += (anti_rotated_y_delta + real_delta.y)/2
        box_corners.se.y += (anti_rotated_y_delta + real_delta.y)/2
    }

    // Cancel movement if width or height is negative
    let new_box_width = box_corners.ne.x - box_corners.nw.x, new_box_height = box_corners.sw.y - box_corners.nw.y
    if (new_box_height < 0 || new_box_width < 0) {
        return initialCoord
    }

    // Return new coordinates of SSBox
    return {
        ...initialCoord,
        x: box_corners.nw.x,
        y: box_corners.nw.y,
        width: new_box_width,
        ratio: media_panel_ratio*new_box_height/new_box_width,
        // Avoid huge stickers on large screen
        maxWidth: Math.round(new_box_width * MEDIA_PANEL_REF_WIDTH) + "px"
    }
}

/**
 *
 * @param initialCoord
 * @param x_init
 * @param y_init
 * @param x_delta
 * @param y_delta
 * @param media_panel_ratio
 * @returns {{rotation: *}}
 */
export const rotateBox = (initialCoord, x_init, y_init, x_delta, y_delta) => {


    // To get the rotation, we need to compute the angle between three points :
    let angle = find_vector_angle(
        {x: initialCoord.x, y: initialCoord.y}, // box_center, as ref point
        {x: x_init, y: y_init},                 // rotatable circle center, i.e. the original cursor position
        {x: x_init+x_delta, y: y_init+y_delta}  // and new cursor position

    )

    // Return new coordinates of SSBox
    return {
        ...initialCoord,
        rotation: ((initialCoord.rotation || 0) + angle) % (2*Math.PI)
    }
}