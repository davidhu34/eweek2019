import { combineReducers } from 'redux'

import { ui } from './ui'
import { product } from './product'
import { school } from './school'

const reducer = combineReducers({
    product,
    school,
    ui
})

export default reducer
