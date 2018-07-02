import React, { Component } from 'react'
import * as UrlTools from "./utilities/API/UrlToolbox"
import api_client from './utilities/API/CliprRequest'
import LibraryContainer from "./containers/library/LibraryContainer"
import {sendToReducersAction} from "./actions"
import store from './store'

import {Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import './styles/main.min.css'
import './styles/library.min.css'
import './styles/mediaPanel.min.css'
import './styles/sticker.min.css'
import './styles/properties.min.css'
import './styles/clip.min.css'

import MediaPanelContainer from "./containers/central/MediaPanelContainer"
import PropertiesContainer from "./containers/properties/PropertiesContainer"
import ApplicationContainer from "./containers/ApplicationContainer";

class App extends Component {

    componentDidMount() {
        
        // FOR TEST PURPOSE
        let fakeData = 0 && process.env.REACT_APP_STAGE !== "production" // http://app.clipr.local:8888/app_dev.php/fr/cnv/converter/6xen90/cs_item/6/edit/

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

            // Now let's get information about media panel
            let cnv_short_code = UrlTools.getParameterByName('cnv', query)
            let cs_item_id = UrlTools.getParameterByName('cs_item', query)
            if (cnv_short_code != null && cs_item_id != null) {


                // Call media information
                if (fakeData) {
                    store.dispatch(sendToReducersAction("API_UPDATE_CS_ITEM",JSON.parse('{"id":6,"cnv_short_code":"6xen90","template":{"general":{"overlay":{"opacity":0.3,"color":"#000"}}},"media":{"src":"http://app.clipr.local:8888/uploads/media/cnv/media/d109cf08-6e54-11e8-ade9-005fda2a44d6.jpeg?v1.7.22","isVideo":false,"ext":"jpeg","fullScreen":false}}')))
                } else {
                    request
                        .get("/cnv/clip/"+cnv_short_code+"/cs_items/"+cs_item_id)
                        // Get response data and save in store
                        .then(response => { store.dispatch(sendToReducersAction("API_UPDATE_CS_ITEM",response.data)) })
                        .catch(error => console.log(error))
                }
            }

            // And finally let's fill library with some content
            if (fakeData) {
                store.dispatch(sendToReducersAction("API_UPDATE_LIBRARY",JSON.parse('{"stickers":{"img":[{"id":"lib-sticker-img-58661b837d90850fc3ce2a6a","ratio":1,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/58661b837d90850fc3ce2a6a.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-5aed97e0208cc94b7bff8de3","ratio":0.67,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/5aed97e0208cc94b7bff8de3.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-585fcd13cb11b227491c35be","ratio":1.2,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/585fcd13cb11b227491c35be.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-580b57fbd9996e24bc43c0b4","ratio":1.13,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/580b57fbd9996e24bc43c0b4.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-580b57fbd9996e24bc43c0b7","ratio":1.27,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/580b57fbd9996e24bc43c0b7.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-580b585b2edbce24c47b2beb","ratio":0.67,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/580b585b2edbce24c47b2beb.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-580b57fbd9996e24bc43c090","ratio":0.65,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/580b57fbd9996e24bc43c090.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-580b57fbd9996e24bc43c0b1","ratio":0.85,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/580b57fbd9996e24bc43c0b1.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-580b57fbd9996e24bc43c091","ratio":2.91,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/580b57fbd9996e24bc43c091.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-587e33b19686194a55adab83","ratio":0.75,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/587e33b19686194a55adab83.png?v1.8.2"},"type":"img"},{"id":"lib-sticker-img-586294603796e30ac4468731","ratio":1,"source":{"src":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/img/586294603796e30ac4468731.png?v1.8.2"},"type":"img"}],"svg":[{"id":"lib-sticker-svg-text","type":"svg","source":{"svg":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/text.svg?v1.8.2"},"customize":{"svg_text":{"id":"svg_text","type":"text","selector":".text","label":"Param\u00e9trage texte","attributes":{"content":"Lorem ipsum","family":"Helvetica","size":"30","color":"#123456"}}},"ratio":0.5},{"id":"lib-sticker-svg-heart","type":"svg","source":{"svg":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/heart.svg?v1.8.2","css":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/heart.css?v1.8.2"},"customize":{"heartSquareFill":{"id":"heartSquareFill","type":"css","selector":".heart-loader__heartPath","property":"fill","value":"#E21737","input":{"type":"color","label":"Remplissage coeur"}},"heartText":{"id":"heartText","type":"text","selector":".heart-text","label":"Texte int\u00e9rieur","attributes":{"content":"I love SVG !","family":"Monoton","size":"20","color":"#ffffff"}}},"ratio":1},{"id":"lib-sticker-svg-wherever","type":"svg","source":{"svg":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/svg/wherever.svg?v1.8.2"},"customize":{"rect_text":{"id":"rect_text","type":"css","selector":".big-you","property":"fill","value":"","input":{"type":"color","label":"Remplissage carre"}}},"ratio":1}]},"fonts":[{"id":"eater","name":"Eater","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Eater.woff2?v1.8.2"},{"id":"galada","name":"Galada","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Galada.woff2?v1.8.2"},{"id":"imfell","name":"IMFell","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/IMFell.woff2?v1.8.2"},{"id":"indieflower","name":"IndieFlower","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/IndieFlower.woff2?v1.8.2"},{"id":"monoton","name":"Monoton","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Monoton.woff2?v1.8.2"},{"id":"roboto","name":"Roboto","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Roboto-Regular.woff2?v1.8.2"},{"id":"shrikhand","name":"Shrikhand","source":"http://app.capteev.local:8888/bundles/cnvpublicdisplay/library/font/Shrikhand.woff2?v1.8.2"}]}')))
            } else {
                request
                    .get("/cnv/stickers")
                    // Get response data and save in store
                    .then(response => { store.dispatch(sendToReducersAction("API_UPDATE_LIBRARY",response.data)) })
                    .catch(error => console.log(error)) 
            }
        }
    }


    render() {

        return (

            <div className="App">

                <ApplicationContainer />

                <Row>

                    <Col sm={4}>
                        <LibraryContainer />
                    </Col>

                    <Col sm={4}>
                        <MediaPanelContainer />
                    </Col>

                    <Col sm={4}>
                        <PropertiesContainer/>
                    </Col>

                </Row>

            </div>
        )
    }
}

export default App
