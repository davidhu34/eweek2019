const schoolInit = {
    list: [],
    activeIndex: null
}

export const school = ( state = schoolInit, action ) => {
    switch ( action.type ) {
        case 'INIT_DATA':
            return action.success? {
                ...state,
                activeIndex: null,
                list: action.schools
            } : state
        case 'SCHOOL_SELECT':
            return {
                ...state,
                activeIndex: action.index
            }
        default:
            return state
    }
}
