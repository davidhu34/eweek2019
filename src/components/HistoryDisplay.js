import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Button, List } from 'semantic-ui-react'

import { showHistory } from '../actions'

const HistoryDisplay = ({ ui, history }) => {
    const { list } = history
    return <Container textAlign='center' style={{
        visibility: ui.page === 'HISTORY'? 'visible': 'hidden'
    }}>
        <Header>History:</Header>
        <List>
        {
            list.map( (history, i) => {
                const { product, count, key } = history
                return <List.Item key={key}>
                    {`${product.name} ${count}個 共${product.price*count}元`}
                </List.Item>
            })
        }
        </List>
    </Container>
}

export default connect(
    ({ ui, history }) => ({ ui, history })
)(HistoryDisplay)
