const uiInit = {
    inited: null,
    submitting: false,
    editing: false, 
    scanning: false,
    accordionIndex: null,
    product: null,
    count: 1
}

export const ui = ( state = uiInit, action ) => {
    switch ( action.type ) {
        case 'REFRESH':
            return {
                ...state,
                inited: false,
                product: null,
                count: 1,
                accordionIndex: null
            }
        case 'UI_EDIT_PURCHASE':
            return {
                ...state,
                product: null,
                count: 1,
                accordionIndex: null,
                editing: true,
            }
        case 'CART_PUT':
        case 'CART_CANCEL':
            return {
                ...state,
                product: null,
                count: 1,
                accordionIndex: null,
                editing: false,
            }
        case 'SUBMIT_PURCHASE_START':
            return {
                ...state,
                submitting: true
            }
        case 'SUBMIT_PURCHASE_END':
            return {
                ...state,
                submitting: false
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
        case 'UI_SCHOOL_SET':
                return {
                    ...state,
                    school: action.school,
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
