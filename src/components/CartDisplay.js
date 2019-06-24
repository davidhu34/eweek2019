import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, List } from 'semantic-ui-react'

import { editPurchase } from '../actions'

const CartDisplay = ({ ui, cart, editPurchase }) => {
    return <Container textAlign='center' style={{
        visibility: ui.page === 'MAIN'? 'visible': 'hidden'
    }}>
        <Button onClick={() => editPurchase(null)}>buy somthing</Button>
        <List>
        {
            cart.list.map( ({ product, count, key }, i) => <List.Item
                key={key}
                onClick={() => editPurchase(i)}>
                {`${product.name} ${count}個 共${product.price*count}元`}
            </List.Item>)
        }
        </List>
    </Container>
}

export default connect(
    ({ ui, cart }) => ({ ui, cart }),
    dispatch => ({
        editPurchase: (index) => dispatch(editPurchase(index))
    })
)(CartDisplay)
