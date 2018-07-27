import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

import CliprRouter from './CliprRouter'
import { Provider } from 'react-redux'
import store from './store'
import { unregister } from './registerServiceWorker'

// Disable index.html cache
unregister()

ReactDOM.render(
    <Provider store={store}>
        <CliprRouter />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
