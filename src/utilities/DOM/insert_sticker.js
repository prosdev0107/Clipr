
import axios from 'axios'

export function customizeStickerOnPage( svgId, cssPath, customize) {

    // TODO : on dirait que dans une iframe ca veut l'ajouter en top layer
    // TODO : intégrer cette fonction direct dans le fichier du component !!

    // => trouver une autre méthode que le document.get... !!
    // ESSAYER DE CREUSER POUR TOUT FAIRE DEPUIS LE COMPONENT
    // D'autre part pas sur qu'on puisse customiser les composants du svg si insérer avec <use> !

    // Step 1 : add missing files to DOM
    [cssPath].forEach(function(filePath) {

        // Is file existing ?
        if (typeof filePath !== "undefined" && filePath !== null) {

            let type = filePath.indexOf('.css') >= 0 ? "css" : "js"
            let selector = type === "css" ? "link[href='"+filePath+"']" : "script[src='"+filePath+"']"

            // Don't add to document if already in
            if (document.querySelector(selector) === null) {

                // load document content
                axios.get(filePath).then((response) => {

                    let fileContent = response.data

                    if (fileContent.length > 0) {

                        if (type === "css") {

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

                        } else {

                            // Create tag
                            /*let svg_script = document.createElement("script")
                            svg_script.id = fileId
                            svg_script.text = fileContent

                            // Add to DOM
                            let body = document.body || document.getElementsByTagName('body')[0]
                            console.log(svg_script)
                            body.appendChild(svg_script) */
                        }
                    }
                })

            }
        }
    })

    // Step 2 : Customize sticker
    let sticker = document.getElementById(svgId)
    if (typeof sticker !== "undefined" && sticker != null && typeof customize !== "undefined" && customize != null) {

        // Some properties in this svg need to be updated
        Object.entries(customize).map(([key, customField]) => {

            // Find the elements concerned about this custom field
            var nodes = sticker.getElementsByClassName(customField.selector)

            Array.prototype.forEach.call(nodes,(node) => {

                let property = customField.property

                // Edit the property
                if (property.indexOf('css_') === 0) {

                    // Edit css style rather than a specific attribute
                    let cssProperty = property.slice(4)
                    node.style[cssProperty] = customField.value

                } else if (property === 'content') {

                    // Edit innerHTML
                    node.innerHTML = customField.value

                } else {

                    // Edit atttribute
                    node.setAttribute(property,customField.value)
                }
            })

            return 1
        })
    }

}