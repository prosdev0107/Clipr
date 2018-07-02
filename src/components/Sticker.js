import React from 'react'
import {StickerDefaults,StickerTypes} from "./propTypes/StickerTypes"
import axios from "axios/index"
import PropTypes from 'prop-types'

const Sticker = ({sticker}) => {

    let {id, type, ratio, source, customize} = sticker

    // WARNING : The real clip uses exactly the same script in main.js. Be careful about any modification.
    const customizeStickerOnPage = (svgId, svgPath, cssPath, customize) => {

        [svgPath, cssPath].forEach(function(filePath) {

            // Is file existing ?
            if (typeof filePath !== "undefined" && filePath !== null && filePath.length > 5) {

                let type = filePath.indexOf('.css') >= 0 ? "css" : "svg"
                let selector = type === "css" ? "link[href='"+filePath+"']" : "script[src='"+filePath+"']"

                // Don't add content if already on page
                if (type === "svg" || (type === "css" && document.querySelector(selector) === null)) {

                    // Load document content
                    axios.get(filePath).then((response) => {

                        let fileContent = response.data

                        if (fileContent.length > 0) {

                            if (type === "svg") {

                                // Get sticker location
                                let sticker = document.getElementById(svgId)

                                // Add content
                                sticker.innerHTML = fileContent

                                if (typeof customize !== "undefined" && customize != null) {

                                    // Some properties in this svg need to be updated
                                    Object.entries(customize).map(([fieldName, customField]) => {

                                        // Find the elements concerned about this custom field
                                        let nodes = sticker.querySelectorAll(customField.selector)

                                        Array.prototype.forEach.call(nodes,(node) => {

                                            switch (customField.type) {

                                                case "css":
                                                    if (customField.property !== "undefined") {
                                                        node.style[customField.property] = customField.value;
                                                    }
                                                    break

                                                case "attribute":
                                                    if (customField.property !== "undefined") {
                                                        node.setAttribute(customField.property, customField.value)
                                                    }
                                                    break

                                                case "text":

                                                    // Several properties to edit about text
                                                    let attributes = customField.attributes
                                                    if (typeof attributes !== "undefined" && attributes != null) {

                                                        node.innerHTML = attributes.content
                                                        node.style.fontFamily = attributes.family
                                                        node.style.fontSize = attributes.size+"px"
                                                        node.style.color = attributes.color
                                                        node.setAttribute("fill",attributes.color)
                                                        node.setAttribute("font-size",attributes.size)
                                                    }

                                                    break

                                                default:
                                                    break
                                            }
                                        })

                                        return 0
                                    })
                                }

                            } else if (type === "css") {

                                // Create tag
                                let svg_style = document.createElement("style")
                                svg_style.type = "text/css"
                                if (svg_style.styleSheet){
                                    svg_style.styleSheet.cssText = fileContent
                                } else {
                                    svg_style.appendChild(document.createTextNode(fileContent))
                                }

                                // Add to DOM
                                let head = document.head || document.getElementsByTagName('head')[0]
                                head.appendChild(svg_style)

                            }
                        }
                    })

                }
            }
        })
    }

    const renderSticker = (id, type, ratio, source, customize)  => {

        switch (type) {

            case 'img':

                return <img src={source.src} alt="sticker"/>

            case 'svg':

                /**
                 * The way we render and customize here is the same than for the real clip
                 * In the real clip, we want to use CDN lo load both css and
                 *
                 * @type {string}
                 */

                // Generate random id
                let randomNb = id + "-" + Math.floor(Math.random() * Math.floor(1000))
                return <div id={randomNb} onLoad={ customizeStickerOnPage(randomNb, source.svg, source.css, customize) }>
                    </div>

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
    sticker: PropTypes.shape(StickerTypes)
}

Sticker.defaultProps = {
    sticker: StickerDefaults
}


export default Sticker
