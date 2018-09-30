import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Health from './Health'

const CliprRouter = () => (
    <Router>
        <div>
            <Route exact path="/health/check" component={Health} />
            <Route exact path="/" component={App} />
        </div>
    </Router>
)

export default CliprRouter