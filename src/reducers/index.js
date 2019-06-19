import { combineReducers } from 'redux'

import { ui } from './ui'
import { cart } from './cart'
import { product } from './product'
import { school } from './school'
import { purchase } from './purchase'

const reducer = combineReducers({
    product,
    school,
    purchase,
    cart,
    ui
})

export default reducer
