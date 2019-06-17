import React from 'react'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'

import Main from './components/Main'

const App = ({ store, history }) => (
    <Provider store={store} >
        <Main />
    </Provider>
)

export default hot(module)(App)
