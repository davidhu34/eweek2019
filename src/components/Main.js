import React, { Component } from 'react'
import { Container, Header, Modal } from 'semantic-ui-react'

import Loading from './Loading'
import SchoolEditor from './SchoolEditor'
import PurchaseEditor from './PurchaseEditor'
import CartDisplay from './CartDisplay'
import Footer from './Footer'
import ModalBase from './ModalBase'

const Main = () => {
    return <Container>
        <Header textAlign='center'>Eweek 2019</Header>
        <Loading />
        <SchoolEditor />
        <PurchaseEditor />
        <CartDisplay />
        <Footer />
        <ModalBase />
    </Container>
}

export default Main
