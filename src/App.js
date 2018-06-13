import React, { Component } from 'react'
import * as UrlTools from "./utilities/API/UrlToolbox"
import api_client from './utilities/API/CliprRequest'
import LibraryContainer from "./containers/library/LibraryContainer"
import {sendToReducersAction} from "./actions"
import store from './store'

import {Row, Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

class App extends Component {

    componentDidMount() {

        // Get Symfony access token from url
        const query = this.props.location.search
        const access_token = UrlTools.getParameterByName('access_token',query)
        if (access_token != null && access_token.length > 0) {

            let request = api_client(access_token)

            // Save token in session so it can now be used to achieve API Rest calls
            localStorage.setItem('access_token', access_token)

            // Now let's get information about media panel
            let cnv_short_code = UrlTools.getParameterByName('cnv', query)
            let cs_item_id = UrlTools.getParameterByName('cs_item', query)
            if (cnv_short_code != null && cs_item_id != null) {


                // Call media information
                request
                    .get("/api/cnv/clip/"+cnv_short_code+"/cs_items/"+cs_item_id)
                    // Get response data and save in store
                    .then(response => { store.dispatch(sendToReducersAction("API_UPDATE_CS_ITEM",response.data)) })
                    .catch(error => console.log(error))
            }

            // And finally let's fill library with some content
            request
                .get("/api/cnv/stickers")
                // Get response data and save in store
                .then(response => { store.dispatch(sendToReducersAction("API_UPDATE_LIBRARY",response.data)) })
                .catch(error => console.log(error))

        }
    }


    render() {

        return (

            <div className="App">

                <Row>

                    <Col sm={4}>
                        <LibraryContainer />
                    </Col>

                    <Col sm={4}>
                    </Col>

                    <Col sm={4}>
                    </Col>

                </Row>

            </div>
        )
    }
}

export default App
