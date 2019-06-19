import { MAIN, QRSCAN, EDITPURCHASE, EDITSCHOOL } from '../consts/pages'

const purchaseInit = {
    accordionIndex: null,
    product: null,
    count: 1
}

export const purchase = ( state = purchaseInit, action ) => {
    switch ( action.type ) {
        case 'REFRESH':
        case 'UI_CHANGE_PAGE':
            return {
                ...state,
                product: null,
                count: 1,
                accordionIndex: null
            }
        case 'PURCHASE_EDIT':
            return {
                ...state,
                product: action.product,
                count: action.count
            }
        case 'PURCHASE_ACCORDION_SET':
            return {
                ...state,
                accordionIndex: action.index
            }
        case 'PURCHASE_PRODUCT_SELECT':
            return {
                ...state,
                product: action.product,
                accordionIndex: null
            }
        case 'PURCHASE_COUNT_SET':
            return {
                ...state,
                count: action.count
            }
        default:
            return state
    }
}
