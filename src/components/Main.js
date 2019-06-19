import React, { Component } from 'react'
import { Container, Header, Loader } from 'semantic-ui-react'

import PurchaseEditor from './PurchaseEditor'
import SchoolEditor from './SchoolEditor'
import Footer from './Footer'
import CartDisplay from './CartDisplay'

const Main = () => {
    return <Container>
        <Header textAlign='center'>Eweek 2019</Header>

        <SchoolEditor />
        <PurchaseEditor />
        <CartDisplay />
        <Loader active inline='centered' />
        <Footer />
    </Container>
}

export default Main
