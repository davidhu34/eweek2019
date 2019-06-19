const cartInit = {
    list:[]
}

export const cart = ( state = cartInit, action ) => {
    const { product, count } = action
    switch ( action.type ) {
        case 'CART_PUT':
            return {
                ...state,
                list: [{
                    product,
                    count
                }, ...state.list]
            }
        case 'CART_CANCEL':
            return {
                ...state
            }
        case 'CART_SUBMIT':
            return {
                ...state,
                list:[]
            }
        case 'CART_CLEAR':
            return {
                ...state,
                list: []
            }
        default:
            return state
    }
}
