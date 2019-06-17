import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import { initData } from './actions'
import { freshStore } from './configureStore'

import App from './App'

const history = createHistory()
const store = freshStore(history)
store.dispatch(initData())

render(
    <App store={store} history={history} />,
    document.getElementById('root')
)
