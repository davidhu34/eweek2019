const cartInit = {
    editing: null,
    list:[]
}

const putlist = (state, action) => {
    const { editing, list } = state
    const purchase = {
        product: action.product,
        count: action.count
    }
    return editing != null? [
        ...list.slice(0, editing),
        {
            ...list[editing],
            ...purchase
        },
        ...list.slice(editing+1),
    ] : [{
        ...purchase,
        key: (new Date()).getTime().toString()
    }, ...list]
}

export const cart = ( state = cartInit, action ) => {
    switch ( action.type ) {
        case 'UI_CHANGE_PAGE':
            return {
                ...state,
                editing: null
            }
        case 'PURCHASE_EDIT':
            return {
                ...state,
                editing: action.index
            }
        case 'PURCHASE_DELETE':
            return {
                ...state,
                list: [
                    ...state.list.slice(0,action.index),
                    ...state.list.slice(action.index+1)
                ]
            }
        case 'CART_PUT':
            return {
                ...state,
                list: putlist(state, action)
            }
        case 'CART_SUBMIT_END':
            return {
                ...state,
                list: action.success? []: state.list
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
