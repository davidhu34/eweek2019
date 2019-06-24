import { combineReducers } from 'redux'

import { ui } from './ui'
import { cart } from './cart'
import { product } from './product'
import { school } from './school'
import { purchase } from './purchase'
import { history }  from './history'

const reducer = combineReducers({
    product,
    school,
    purchase,
    history,
    cart,
    ui
})

export default reducer
