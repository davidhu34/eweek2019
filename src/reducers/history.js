const historyInit = {
    list: [],
    team: null,
    total: 0
}

export const history = ( state = historyInit, action ) => {
    switch ( action.type ) {
        case 'REFRESH':
            return {
                ...state,
                ...historyInit
            }
        case 'HISTORY_GET_END':
            return {
                ...state,
                list: action.histories,
                total: action.total,
                team: action.team
            }
        default:
            return state
    }
}
