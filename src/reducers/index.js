import { combineReducers } from 'redux'

import { ui } from './ui'
import { cart } from './cart'
import { product } from './product'
import { school } from './school'

const reducer = combineReducers({
    product,
    school,
    cart,
    ui
})

export default reducer
