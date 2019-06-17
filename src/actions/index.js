import axios from 'axios'

import { API_ROOT } from '../configs'

export const initData = () => (dispatch, getState) => {
    if (isNaN(getState().ui.inited)) {
        dispatch({ type: 'REFRESH' })
    }
    axios.get(API_ROOT+'/init')
        .then(res => {
            const { schools, products } = res.data
            dispatch({
                type: 'INIT_DATA',
                success: true,
                schools, products
            })
        })
        .catch(err => {
            dispatch({
                type: 'INIT_DATA',
                error: err,
                success: false
            })
        })
}

export const selectProd = (index) => (dispatch, getState) => {
    dispatch({
        type: 'PRODUCT_SELECT',
        index: index
    })

    const { product } = getState()
    dispatch({
        type: 'UI_PRODUCT_SET',
        product: product.list[index]
    })
}

export const selectSchool = (index) => (dispatch, getState) => {
    dispatch({
        type: 'SCHOOL_SELECT',
        index: index
    })

    const { school } = getState()
    dispatch({
        type: 'UI_SCHOOL_SET',
        school: school.list[index]
    })
}

export const setCount = (count) => ({
    type: 'UI_COUNT_SET',
    count: count
})

export const setAccordion = (index) => ({
    type: 'UI_ACCORDION_SET',
    index: index
})
