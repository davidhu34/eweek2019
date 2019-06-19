import React, { Component } from 'react'
import { Container, Header, Loader } from 'semantic-ui-react'

import ProductAccordion from './ProductAccordion'
import Footer from './Footer'
import CartDisplay from './CartDisplay'

import { PROD_PANEL_KEY, COUNT_PANEL_KEY } from '../consts'

const Main = () => {
    return <Container>
        <Header textAlign='center'>Eweek 2019</Header>
        <ProductAccordion />
        <CartDisplay />
        <Loader active inline='centered' />
        <Footer />
    </Container>
}


export default Main
