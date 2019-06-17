const schoolInit = {
    list: [],
    activeIndex: null
}

export const school = ( state = schoolInit, action ) => {
    switch ( action.type ) {
        case 'INIT_DATA':
            return {
                ...state,
                activeIndex: null,
                list: action.schools
            }
        case 'SCHOOL_FETCHED':
        case 'SCHOOL_SELECT':
            return {
                ...state,
                activeIndex: action.index
            }
        default:
            return state
    }
}
