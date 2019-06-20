import React from 'react'
import { render } from 'react-dom'

import { initData } from './actions'
import { freshStore } from './configureStore'

import App from './App'

const store = freshStore()
store.dispatch(initData())

render(
    <App store={store} />,
    document.getElementById('root')
)
