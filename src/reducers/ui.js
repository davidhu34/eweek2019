import { MAIN } from '../consts/pages'
const uiInit = {
    inited: null,
    submitting: false,
    page: MAIN,
}

export const ui = ( state = uiInit, action ) => {
    switch ( action.type ) {
        case 'REFRESH':
            return {
                ...state,
                inited: false
            }
        case 'UI_CHANGE_PAGE':
            return {
                ...state,
                page: action.page
            }
        case 'HISTORY_GET_START':
        case 'CART_SUBMIT_START':
            return {
                ...state,
                submitting: true
            }
        case 'HISTORY_GET_END':
        case 'CART_SUBMIT_END':
            return {
                ...state,
                submitting: false
            }
        case 'INIT_DATA':
            return {
                ...state,
                inited: action.success? 1: 0
            }
        case 'UI_SCHOOL_SET':
            return {
                ...state,
                school: action.school,
                page: MAIN
            }
        default:
            return state
    }
}
