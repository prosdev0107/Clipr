import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import CliprRouter from './CliprRouter'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <CliprRouter />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
