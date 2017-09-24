import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import App from './App'
import UserPage from './components/userPage'

const NotFound = () => <h1>404</h1>

const Routes = () => (
    <HashRouter>
        <div style={{width:'100%'}}>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route exact path='/users/:user' component={UserPage}/>
                <Route component={NotFound} />
            </Switch>
        </div>
    </HashRouter>
)

export default Routes;