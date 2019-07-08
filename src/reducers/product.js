const productInit = {
    list: [],
    activeIndex: null
}

export const product = ( state = productInit, action ) => {
    switch ( action.type ) {
        case 'INIT_DATA':
            return action.success? {
                ...state,
                activeIndex: null,
                list: action.products
            } : state
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
