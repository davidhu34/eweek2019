const modalInit = {
    show: false,
    title: null,
    icon: null,
    content: null,
    buttons: []
}

export const modal = ( state = modalInit, action ) => {
    switch ( action.type ) {
        case 'MODAL_SHOW':
            return {
                ...state,
                show: true,
                title: action.title || '',
                icon: action.icon || '',
                content: action.content || '',
                buttons: action.buttons || [],
            }
        case 'MODAL_HIDE':
            return {
                ...state,
                ...modalInit
            }
        default:
            return state
    }
}
