import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Loader, Accordion } from 'semantic-ui-react'

import { initData, setAccordion } from '../actions'
import { PROD_PANEL_KEY, COUNT_PANEL_KEY, SCHOOL_PANEL_KEY } from '../consts'

import ProductList from './ProductList'
import CountPanel from './CountPanel'

class RootAccordion extends Component {

    accordionOrder = [PROD_PANEL_KEY,COUNT_PANEL_KEY]//, SCHOOL_PANEL_KEY]
    accordionGen = (key) => {
        switch(key) {
            case PROD_PANEL_KEY:
                return {
                    header: '材料',
                    getData: () => {
                        const { product } = this.props.ui
                        return product? product.name: ''
                    },
                    content: <ProductList />
                }
            case COUNT_PANEL_KEY:
                return {
                    header: '數量',
                    getData: () => this.props.ui.count || 1,
                    content: <CountPanel />
                }
            case SCHOOL_PANEL_KEY:
                return {
                    header: '學校',
                    getData: () => {
                        const { school } = this.props.ui
                        return school? product.name: ''
                    },
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
        const { setAccordion, ui } = this.props
        setAccordion(ui.accordionIndex === index? null: index)
    }

    componentDidMount = () => initData()

    render() {
        const { accordionIndex, inited } = this.props.ui

        const panels = this.getAccordionPanels(accordionIndex)

        return inited
            ? <Accordion
                activeIndex={accordionIndex}
                panels={panels}
                onTitleClick={this.handleTitleClick} />
            : <Loader active inline='centered' />
    }
}

export default connect(
    ({ ui }) => ({ ui }),
    dispatch => ({
        setAccordion: (index) => dispatch(setAccordion(index)),
        initData: () => dispatch(initData()),
    })
)(RootAccordion)
