import axios from 'axios'

import { API_ROOT } from '../configs'
import { MAIN, EDITPURCHASE, EDITSCHOOL, HISTORY } from '../consts/pages'

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

export const showModal = (params) => (dispatch, getState) => {
    dispatch({
        type: 'MODAL_SHOW',
        ...params
    })
}

export const closeModal = (index) => (dispatch, getState) => {
    const { buttons } = getState().modal
    const button = buttons[index]
    if (button.act) dispatch(button.act)
    dispatch({ type: 'MODAL_HIDE' })    
}

export const changePage = (page) => ({
    type: 'UI_CHANGE_PAGE',
    page: page
})

const backToMain = () => changePage(MAIN)

export const showHistory = (team) => (dispatch, getState) => {

    const { ui, school, history } = getState()

    if (ui.submitting) return
    else dispatch(changePage(HISTORY))

    const { list, activeIndex } = school

    const activeSchool = list[activeIndex]
    const team = activeSchool._id
    const historySchool = history.team

    dispatch({ type: 'HISTORY_GET_START' })

    axios.get(`${API_ROOT}\/teamhistory\/${team}`)
        .then( res => {
            const { purchases, total } = res.data
            dispatch({
                type: 'HISTORY_GET_END',
                team: team,
                histories: purchases,
                total: total,
                success: true,
            })
        })
        .catch(err => {
            dispatch({
                type: 'HISTORY_GET_END',
                team: team,
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
    dispatch(schoolCancel(null))
}

const schoolPut = (school) => ({
    type: 'UI_SCHOOL_SET',
    school: school
})

const schoolCancel = (param) => ({
    type: 'UI_SCHOOL_SET',
    school: null
})

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


export const deletePurchase = ({ index, purchase }) => showModal({
    title: '確認移除',
    icon: 'trash alternate outline',
    content: `刪除項目: ${purchase.product.name} ${purchase.count}個 ？`,
    buttons: [{
        text: '取消',
    },{
        text: '刪除',
        color: 'red',
        icon: 'trash alternate outline',
        act: {
            type: 'PURCHASE_DELETE',
            index
        }
    }]
})

const cartPut = (param) => (dispatch, getState) => {
    const { product, count } = getState().purchase
    dispatch({
        type: 'CART_PUT',
        product,
        count
    })
    dispatch(backToMain())
}

const cartCancel = (param) => backToMain()

const cartSubmitAct = (dispatch, getState) => {

    const { ui, cart, school } = getState()
    if (ui.submitting) return

    const { list, activeIndex } = school

    const activeSchool = list[activeIndex]

    dispatch({ type: 'CART_SUBMIT_START' })

    axios.post(API_ROOT+'/buyall', {
        school: activeSchool._id,
        purchases: cart.list.map( p => ({
            count: p.count,
            product: p.product._id
        }))
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

const cartSubmit = (param) => showModal({
    title: '確認送出',
    content: '確定送出購物車內容？',
    buttons: [{
        text: '取消'
    },{
        text: '送出',
        icon: 'check',
        color: 'green',
        act: cartSubmitAct
    }]
})

const cartClear = (param) => ({
    type: 'CART_CLEAR'
})

export const footerDispatchers = dispatch => {

    const actionMap = {
        schoolPut,
        schoolCancel,
        backToMain,
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
