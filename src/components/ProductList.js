import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import { selectProd } from '../actions'

const ProductList = ({ product, selectProd }) => <Container>
    {product.list.map( (prod, index) => <div
        onClick={ (e) => selectProd(index)}
        key={prod.alias}>
        {prod.name}
    </div>)}
</Container>

export default connect(
    ({ product }) => ({ product }),
    dispatch => ({
        selectProd: (index) => dispatch(selectProd(index))
    })
)(ProductList)
