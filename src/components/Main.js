import React, { Component } from 'react'
import { Segment, Container, Header, Modal } from 'semantic-ui-react'

import Loading from './Loading'
import SchoolEditor from './SchoolEditor'
import PurchaseEditor from './PurchaseEditor'
import CartDisplay from './CartDisplay'
import Footer from './Footer'
import ModalBase from './ModalBase'

const Main = () => {
    return <div>
        <Segment color='blue' inverted>
            <Header inverted textAlign='center'>
                Eweek 2019 物品補給站
            </Header>
        </Segment>
        
        <Container>
            <SchoolEditor />
            <PurchaseEditor />
            <CartDisplay />
        </Container>

        <Footer />
        <Loading />
        <ModalBase />
    </div>
}

export default Main
