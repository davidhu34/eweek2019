import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button, Icon, List } from 'semantic-ui-react'

import { editPurchase, deletePurchase } from '../actions'

const CartDisplay = ({
    ui, cart,
    editPurchase, deletePurchase
}) => <Container textAlign='center' style={{
    visibility: ui.page === 'MAIN'? 'visible': 'hidden'
}}>
    <Button onClick={() => editPurchase(null)}>buy somthing</Button>
    <List>
    {cart.list.map( (purchase, i) => {
        const { product, count, key } = purchase
        return <List.Item key={key}>

            <Button basic
                color='violet'
                onClick={() => editPurchase(i)}
                content={`${product.name} ${count}個 共${product.price*count}元`}
            />
            
            <Button icon circular inverted
                onClick={ () => deletePurchase(i,purchase)}>
                <Icon color='red' name='remove' />
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
