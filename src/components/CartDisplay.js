import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Icon, List } from 'semantic-ui-react'

import { editPurchase, deletePurchase } from '../actions'

const CartDisplay = ({
    ui, cart,
    editPurchase, deletePurchase
}) => ui.page !== 'MAIN'? null
: <Container textAlign='center'>
    <Button primary
        className='bbb'
        size='large'
        onClick={() => editPurchase(null)}>
        <Icon name='cart plus' />新增項目
    </Button>
    <List>
    {cart.list.map( (purchase, i) => {
        const { product, count, key } = purchase
        return <List.Item key={key}>

            <Button basic
                color='blue'
                onClick={() => editPurchase(i)}
                content={`${product.name} ${count}個 共${product.price*count}元`}
            />

            <Button icon circular inverted
                onClick={ () => deletePurchase(i,purchase)}>
                <Icon color='red' name='trash' />
            </Button>

        </List.Item>
    })}
    </List>
</Container>

export default connect(
    ({ ui, cart }) => ({ ui, cart }),
    dispatch => ({
        editPurchase: (index) => dispatch(editPurchase(index)),
        deletePurchase: (index,purchase) => dispatch(deletePurchase({ index, purchase }))
    })
)(CartDisplay)
