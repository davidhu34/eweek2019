import React, { Component } from 'react'
import { connect } from 'react-redux'

import { EDITPURCHASE } from '../consts/pages'

import PurchaseAccordion from './PurchaseAccordion'

const PurchaseEditor = ({ ui }) => ui.page === EDITPURCHASE? <PurchaseAccordion />: null

export default connect(
    ({ ui }) => ({ ui })
)(PurchaseEditor)
