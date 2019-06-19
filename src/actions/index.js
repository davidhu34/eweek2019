import axios from 'axios'

import { API_ROOT } from '../configs'
import { MAIN, QRSCAN, EDITPURCHASE, EDITSCHOOL } from '../consts/pages'

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

export const changePage = (page) => ({
    type: 'UI_CHANGE_PAGE',
    page: page
})

export const selectProd = (index) => (dispatch, getState) => {
    dispatch({
        type: 'PRODUCT_SELECT',
        index: index
    })

    const { list, activeIndex } = getState().product
    dispatch({
        type: 'PURCHASE_PRODUCT_SELECT',
        product: list[activeIndex]
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
    type: 'PURCHASE_COUNT_SET',
    count: count
})

export const setPurchaseAccordion = (index) => ({
    type: 'PURCHASE_ACCORDION_SET',
    index: index
})

export const editPurchase = (index) => (dispatch, getState) => {
    dispatch(changePage(EDITPURCHASE))
    if (index != null) {
        const { list } = getState().cart
        const { product, count } = list[index]
        dispatch({
            type: 'PURCHASE_EDIT',
            product,
            count,
            index
        })
    }
}

const cartPut = (param) => (dispatch, getState) => {
    const { product, count } = getState().purchase
    dispatch({
        type: 'CART_PUT',
        product,
        count
    })
    dispatch(changePage(MAIN))
}

const cartCancel = (param) => changePage(MAIN)

const cartSubmit = () => (dispatch, getState) => {

    const { ui, cart } = getState()
    const { school } = ui

    dispatch({ type: 'CART_SUBMIT_START' })

    axios.post(API_ROOT+'/buyall', {
        school: school.alias,
        purchases: cart.list
    }).then( res => {
        console.log(res);
        dispatch({
            type: 'CART_SUBMIT_END',
            success: true,
        })
    })
    .catch(err => {
        dispatch({
            type: 'CART_SUBMIT_END',
            error: err,
            success: false
        })
    })
}

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
