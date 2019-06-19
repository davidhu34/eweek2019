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
        case 'PRODUCT_SELECT':
            return {
                ...state,
                activeIndex: action.index
        }
        case 'UI_CHANGE_PAGE':
            return {
                ...state,
                activeIndex: null
            }
        default:
            return state
    }
}
