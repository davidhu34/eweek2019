const productInit = {
    list: [],
    activeIndex: null
}

export const product = ( state = productInit, action ) => {
    switch ( action.type ) {
        case 'INIT_DATA':
            return {
                ...state,
                activeIndex: null,
                list: action.products
            }
        case 'PRODUCT_FETCHED':
        case 'PRODUCT_SELECT':
            return {
                ...state,
                activeIndex: action.index
            }
        default:
            return state
    }
}
