import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import { EDITPURCHASE } from '../consts/pages'

import PurchaseAccordion from './PurchaseAccordion'

const PurchaseEditor = ({ ui }) => ui.page === EDITPURCHASE
    ? <Container>
        <PurchaseAccordion />
    </Container>
    : null

export default connect(
    ({ ui }) => ({ ui })
)(PurchaseEditor)
