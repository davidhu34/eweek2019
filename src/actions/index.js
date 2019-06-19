import axios from 'axios'

import { API_ROOT } from '../configs'

export const submitPurchase = () => (dispatch, getState) => {

    const { school, product, count } = getState().ui
    
    dispatch({ type: 'SUBMIT_PURCHASE_START' })

    axios.post(API_ROOT+'/buy', {
        school: school.alias,
        product: product.alias,
        count: count
    }).then( res => {
        console.log(res);
        dispatch({
            type: 'SUBMIT_PURCHASE_END',
            success: true,
            purchase: {}
        })
    })
    .catch(err => {
        dispatch({
            type: 'SUBMIT_PURCHASE_END',
            error: err,
            success: false
        })
    })
}


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

export const editPurchase = () => ({
    type: 'UI_EDIT_PURCHASE',
})

const cartPut = (param) => (dispatch, getState) => {
    const { product, count } = getState().ui
    dispatch({
        type: 'CART_PUT',
        product,
        count
    })
}

const cartCancel = (param) => ({
    type: 'CART_CANCEL'
})

const cartSubmit = (param) => ({
    type: 'CART_SUBMIT'
})
const cartClear = (param) => ({
    type: 'CART_CLEAR'
})

export const footerDispatchers = dispatch => {

    const actionMap = {
        cartPut,
        cartCancel,
        cartSubmit,
        cartClear
    }

    let dispatchers = {}
    Object.keys(actionMap).map( act => {
        dispatchers[act] = (param) => dispatch(actionMap[act](param))
    })

    return dispatchers
}