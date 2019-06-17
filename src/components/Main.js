import React, { Component } from 'react'
import { Container, Header, Accordion } from 'semantic-ui-react'

import RootAccordion from './RootAccordion'
import { PROD_PANEL_KEY, COUNT_PANEL_KEY } from '../consts'

const Main = () => {
    return <Container>
        <Header textAlign='center'>Eweek 2019</Header>
        <RootAccordion />
    </Container>
}


export default Main
