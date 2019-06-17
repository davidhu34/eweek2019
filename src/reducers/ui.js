const uiInit = {
    inited: null,
    product: null,
    count: 1,
    accordionIndex: null,
}

export const ui = ( state = uiInit, action ) => {
    switch ( action.type ) {
        case 'REFRESH':
            return {
                ...state,
                product: null,
                count: 1,
                accordionIndex: nul,
                inited: false
            }
        case 'INIT_DATA':
            return {
                ...state,
                inited: action.success? 1: 0
            }
        case 'UI_PRODUCT_SET':
            return {
                ...state,
                product: action.product,
                count: 1,
                accordionIndex: null
            }
        case 'UI_COUNT_SET':
            return {
                ...state,
                count: action.count
            }
        case 'UI_ACCORDION_SET':
            return {
                ...state,
                accordionIndex: action.index
            }
        default:
            return state
    }
}
