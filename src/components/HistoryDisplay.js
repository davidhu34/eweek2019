import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header, List } from 'semantic-ui-react'

const HistoryDisplay = ({ ui, history }) => {
    const { list, total } = history
    const items = list
        .sort( (h1,h2) => h2.time - h1.time)
        .map( (history, i) => {
            const { product, count, key } = history
            return <List.Item key={key}>
                {`${product.name} ${count}個 共${product.price*count}元`}
            </List.Item>
        })
    return <Container textAlign='center' style={{
        visibility: ui.page === 'HISTORY'? 'visible': 'hidden'
    }}>
        <Header className='fff'>
            {`總共花費：${total} 元`}
        </Header>

        <List className='ggg'>
            {items}
        </List>
    </Container>
}

export default connect(
    ({ ui, history }) => ({ ui, history })
)(HistoryDisplay)
