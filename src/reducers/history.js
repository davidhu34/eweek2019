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
            return action.success? {
                ...state,
                list: action.histories,
                total: action.total,
                team: action.team
            }: action.team !== state.team? {
                ...state,
                ...historyInit
            }: state
        default:
            return state
    }
}
