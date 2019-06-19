import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader, Accordion } from 'semantic-ui-react'

import { initData, setPurchaseAccordion } from '../actions'
import { PROD_PANEL_KEY, COUNT_PANEL_KEY } from '../consts'

import { EDITPURCHASE } from '../consts/pages'

import ProductList from './ProductList'
import CountPanel from './CountPanel'

class PurchaseAccordion extends Component {

    accordionOrder = [PROD_PANEL_KEY,COUNT_PANEL_KEY]
    accordionGen = (key) => {
        switch(key) {
            case PROD_PANEL_KEY:
                return {
                    header: '材料',
                    getData: () => {
                        const { product } = this.props.purchase
                        return product? product.name: ''
                    },
                    content: <ProductList />
                }
            case COUNT_PANEL_KEY:
                return {
                    header: '數量',
                    getData: () => this.props.purchase.count || 1,
                    content: <CountPanel />
                }
            default:
                return {}
        }
    }
    getAccordionPanels = (accordionIndex) => this.accordionOrder.map( (key, i) => {
        const data = this.accordionGen(key)
        return {
            key: key,
            title: `${data.header}: ${i === accordionIndex? '': data.getData()}`,
            content: <Accordion.Content key={key} content={data.content} />
        }
    })

    handleTitleClick = (e,itemProps) => {
        const { index } = itemProps
        console.log(itemProps)
        const { purchase, setPurchaseAccordion } = this.props
        setPurchaseAccordion(purchase.accordionIndex === index? null: index)
    }

    render() {
        const { accordionIndex } = this.props.purchase
        const panels = this.getAccordionPanels(accordionIndex)

        return <Accordion
            activeIndex={accordionIndex}
            panels={panels}
            onTitleClick={this.handleTitleClick} />
    }
}

export default connect(
    ({ purchase }) => ({ purchase }),
    dispatch => ({
        setPurchaseAccordion: (index) => dispatch(setPurchaseAccordion(index))
    })
)(PurchaseAccordion)
