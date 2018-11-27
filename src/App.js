import React, { Component } from 'react'
import * as UrlTools from "./utilities/API/UrlToolbox"
import api_client from './utilities/API/CliprRequest'
import {sendToReducersAction} from "./actions"
import store from './store'
import data_providers from './api_endpoints'

// Theme css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import './styles/bootstrapXL.min.css'
import './styles/theme/bootstrap-extend.min.css'
import './styles/theme/site.min.css'
import './styles/theme/animate/animate.min.css'
import './styles/main.min.css'
import './styles/library.min.css'
import './styles/mediaPanel.min.css'
import './styles/mediasSwitcher.min.css'
import './styles/previewSwitcher.min.css'
import './styles/sticker.min.css'
import './styles/properties.min.css'
import './styles/clip.min.css'
import './styles/fake-interactions.css'
import './styles/mediaImportModal.css'
import './styles/simulator.css'

import ApplicationContainer from "./containers/ApplicationContainer";

class App extends Component {

    componentDidMount() {
        
        // FOR TEST PURPOSE
        // Editor : http://app.clipr.local:8888/app_dev.php/fr/cnv/converter/6xen90/cs_item/6/edit/
        // Sim : http://app.clipr.local:8888/app_dev.php/fr/p/6xen90/?test=1&simulator=1&no_list=1
        let fakeData = 0 && process.env.REACT_APP_STAGE !== "production"

        // Get Symfony access token from url
        const query = this.props.location.search
        const access_token = UrlTools.getParameterByName('access_token',query)
        if (fakeData || (access_token != null && access_token.length > 0)) {

            // Initialize request instance with client information
            let request = api_client({
                access_token: access_token,
                client_secret: UrlTools.getParameterByName('secret',query),
                refresh_token: UrlTools.getParameterByName('refresh_token',query),
                client_id: UrlTools.getParameterByName('client_id',query)
            })

            // Host url if any ?
            let url_host = UrlTools.getParameterByName('url_host',query)
            if (url_host != null) {
                store.dispatch(sendToReducersAction("API_UPDATE_URL_HOST",url_host))
            }


            // Now let's get information about media panel
            let cnv_short_code = UrlTools.getParameterByName('cnv', query)
            if (cnv_short_code != null) {

                // Call media information
                if (fakeData) {
                    store.dispatch(sendToReducersAction("API_UPDATE_CS_ITEMS",JSON.parse('{"id":6,"cnv_short_code":"6xen90","template":{"general":{"overlay":{"color":"#000","opacity":0},"media":{"duration":5,"isVideo":false,"animation":"zoom-in","fit-screen":false},"theme":{"color":{"id":"purple","name":"Violet","comps":{"static":"#5B1488","gradient":["#5B1488","#D15BCA","#5B1488"]}},"font":"Montserrat","color_comps":{"static":"#283F81","gradient":["#283F81","#6F97D2","#283F81"]},"use_static_color":false}},"story_stickers":[]},"cnv_type":"ACTION","url":"http://app.clipr.local:8888/app_dev.php/fr/p/6xen90/?test=1&simulator=1&no_list=1&url_host=http://192.168.1.19:3000","media":{"src":"http://app.capteev.local:8888/uploads/media/cnv/media/d109cf08-6e54-11e8-ade9-005fda2a44d6.jpeg?v1.8.12","thumbnail":"http://app.capteev.local:8888/uploads/media/cnv/media/d109cf08-6e54-11e8-ade9-005fda2a44d6.jpeg?v1.8.12","isVideo":false,"ext":"jpeg"}}')))
                } else {
                    // Get clip basic info
                    request
                        .get(data_providers.clip.read(cnv_short_code))
                        // Get response data and save in store
                        .then(response => { store.dispatch(sendToReducersAction("API_UPDATE_CLIP",response.data)) })
                        .catch(error => console.log(error))
                    // Get linked cs_items
                    request
                        .get(data_providers.cs_item.list(cnv_short_code))
                        // Get response data and save in store
                        .then(response => {
                            store.dispatch(sendToReducersAction("API_UPDATE_CS_ITEMS",response.data))
                            if (response.data.length === 0) {
                                // There is no items to display -> show upload media modal
                                store.dispatch(sendToReducersAction("SHOW_IMPORT_MEDIA_MODAL",response.data))
                            }
                        })
                        .catch(error => console.log(error))
                }
            }

            // And finally let's fill library with some content
            if (fakeData) {
                store.dispatch(sendToReducersAction("API_UPDATE_LIBRARY",JSON.parse('{"params":{"stickers":{"svg":[{"id":"lib-sticker-svg-heart","type":"svg","source":{"svg":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/heart.svg?v1.8.12","css":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/heart.css?v1.8.12"},"customize":{"heartSquareFill":{"id":"heartSquareFill","type":"css","selector":".heart-loader__heartPath","property":"fill","value":"#E21737","input":{"type":"color","label":"Remplissage coeur"}},"heartText":{"id":"heartText","type":"text","selector":".heart-text","label":"Texte int\u00e9rieur","attributes":{"content":"I love SVG !","family":"Monoton","size":"20","color":"#ffffff"}}},"ratio":1},{"id":"lib-sticker-svg-wherever","type":"svg","source":{"svg":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/wherever.svg?v1.8.12"},"customize":{"rect_text":{"id":"rect_text","type":"css","selector":".big-you","property":"fill","value":"","input":{"type":"color","label":"Remplissage carre"}}},"ratio":1}],"text":[{"id":"lib-sticker-svg-text","type":"svg","source":{"svg":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/text.svg?v1.8.12"},"customize":{"svg_text":{"id":"svg_text","type":"text","selector":".text","label":"Param\u00e9trage texte","attributes":{"content":"Texte Simple","family":"Pacifico","size":"30","color":"#123456"}}},"ratio":0.5},{"id":"lib-sticker-svg-text-interstellar","type":"svg","source":{"svg":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/text-interstellar.svg?v1.8.12","css":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/text-interstellar.css?v1.8.12"},"customize":{"svg_text":{"id":"svg_text","type":"text","selector":".text","label":"Param\u00e9trage texte","attributes":{"content":"Interstellar","family":"Open Sans","size":"26","color":"#123456"}}},"ratio":0.5},{"id":"lib-sticker-svg-text-typing","type":"svg","source":{"svg":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/text-typing.svg?v1.8.12","css":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/text-typing.css?v1.8.12"},"customize":{"svg_text":{"id":"svg_text","type":"text","selector":".text","label":"Param\u00e9trage texte","attributes":{"content":"Typing Animation","family":"Amatic","size":"30","color":"#123456"}}},"ratio":0.5}]},"sticker_fonts":[{"id":"acme","name":"Acme","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Acme-Regular.woff2?v1.8.12","type":"sticker"},{"id":"amatic","name":"Amatic","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/AmaticSC-Regular.woff2?v1.8.12","type":"sticker"},{"id":"bangers","name":"Bangers","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Bangers-Regular.woff2?v1.8.12","type":"sticker"},{"id":"boogaloo","name":"Boogaloo","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Boogaloo-Regular.woff2?v1.8.12","type":"sticker"},{"id":"caveat","name":"Caveat","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Caveat-Regular.woff2?v1.8.12","type":"sticker"},{"id":"concertone","name":"Concert One","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/ConcertOne-Regular.woff2?v1.8.12","type":"sticker"},{"id":"courgette","name":"Courgette","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Courgette-Regular.woff2?v1.8.12","type":"sticker"},{"id":"dancingscript","name":"Dancing Script","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/DancingScript-Regular.woff2?v1.8.12","type":"sticker"},{"id":"greatvibes","name":"GreatVibes","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/GreatVibes-Regular.woff2?v1.8.12","type":"sticker"},{"id":"indieflower","name":"IndieFlower","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/IndieFlower-Regular.woff2?v1.8.12","type":"sticker"},{"id":"kalam","name":"Kalam","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Kalam-Regular.woff2?v1.8.12","type":"sticker"},{"id":"lato","name":"Lato","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Lato-Regular.woff2?v1.8.12","type":"sticker"},{"id":"lobster","name":"Lobster","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Lobster-Regular.woff2?v1.8.12","type":"sticker"},{"id":"luckiestguy","name":"Luckiest Guy","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/LuckiestGuy-Regular.woff2?v1.8.12","type":"sticker"},{"id":"monoton","name":"Monoton","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Monoton-Regular.woff2?v1.8.12","type":"sticker"},{"id":"muli","name":"Muli","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Muli-Regular.woff2?v1.8.12","type":"sticker"},{"id":"opensans","name":"Open Sans","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/OpenSans-Regular.woff2?v1.8.12","type":"sticker"},{"id":"pacifico","name":"Pacifico","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Pacifico-Regular.woff2?v1.8.12","type":"sticker"},{"id":"permanentmarker","name":"Permanent Marker","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/PermanentMarker-Regular.woff2?v1.8.12","type":"sticker"},{"id":"poiretone","name":"Poiret One","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/PoiretOne-Regular.woff2?v1.8.12","type":"sticker"},{"id":"roboto","name":"Roboto","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Roboto-Regular.woff2?v1.8.12","type":"sticker"}],"img_animations":["zoom-in","zoom-out"],"themes":{"colors":[{"id":"red","name":"Rouge","comps":{"static":"#fc4245","gradient":["#ff0f3e","#ff6e3d","#ff1e1e"]}},{"id":"black","name":"Noir","comps":{"static":"#0A0A0A","gradient":["#0C0D0D","#787A7B","#080808"]}},{"id":"darkblue","name":"Bleu sombre","comps":{"static":"#283F81","gradient":["#283F81","#6F97D2","#283F81"]}},{"id":"green","name":"Vert","comps":{"static":"#2C8814","gradient":["#2C8814","#A7D26F","#2C8814"]}},{"id":"purple","name":"Violet","comps":{"static":"#5B1488","gradient":["#5B1488","#D15BCA","#5B1488"]}}],"fonts":[{"id":"theme_lato","name":"Lato","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/theme-fonts/Lato-Regular.woff2?v1.8.12","type":"theme"},{"id":"theme_montserrat","name":"Montserrat","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/theme-fonts/Montserrat-Regular.woff2?v1.8.12","type":"theme"},{"id":"theme_muli","name":"Muli","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/theme-fonts/Muli-Regular.woff2?v1.8.12","type":"theme"},{"id":"theme_opensans","name":"Open Sans","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/theme-fonts/OpenSans-Regular.woff2?v1.8.12","type":"theme"},{"id":"theme_roboto","name":"Roboto","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/theme-fonts/Roboto-Regular.woff2?v1.8.12","type":"theme"},{"id":"theme_ubuntu","name":"Ubuntu","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/theme-fonts/Ubuntu-Regular.woff2?v1.8.12","type":"theme"},{"id":"theme_varela","name":"Varela","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/theme-fonts/VarelaRound-Regular.woff2?v1.8.12","type":"theme"}],"default_font":"Montserrat","default_color":"red-gradient"}}}')))
            } else {
                request
                    .get(data_providers.sticker.list)
                    // Get response data and save in store
                    .then(response => {
                        store.dispatch(sendToReducersAction("API_UPDATE_LIBRARY",response.data));
                        // Declare page has loaded after a few seconds, so save button won't appear immediately
                        setTimeout(() => {store.dispatch(sendToReducersAction("API_LOADING_ENDED",response.data))},4000);
                    })
                    .catch(error => console.log(error)) 
            }
        }
    }

    render() {

        return (

            <div className="App">

                <ApplicationContainer />

            </div>
        )
    }
}

export default App
