import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import reducer from './reducers'

const freshStore = () => {
    const middlewares = []
    middlewares.push( logger )
    middlewares.push( thunk )

    return createStore(
        reducer,
        {},
        compose(
            applyMiddleware( ...middlewares )
        )
    )
}

export { freshStore }
