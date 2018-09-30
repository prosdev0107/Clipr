import React, { Component } from 'react'
import store from "./store";
import {sendToReducersAction} from "./actions"

class Health extends Component {

    componentDidMount() {

        store.dispatch(sendToReducersAction("API_LOADING_ENDED",1))
    }

    render() {

        return (
            <div>

                Success

            </div>
        )
    }
}

export default Health
