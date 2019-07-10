import React, { Component } from 'react'

import { Container, List, Table } from 'semantic-ui-react'

const PurchaseRow = ({ purchase, deletePurchase }) => {
    const { key, count, product, school } = purchase
    return <Table.Row key={key}>
        <Table.Cell>{school.name}</Table.Cell>
        <Table.Cell>{`${product.name} \$${product.price}`}</Table.Cell>
        <Table.Cell>{count}</Table.Cell>
        <Table.Cell>{'$'+product.price*count}</Table.Cell>
        <Table.Cell
            onClick={deletePurchase}>
            DEL
        </Table.Cell>
    </Table.Row>
}
const PurchaseList = ({ purchases, deletePurchases }) => <Table>
    <Table.Header>
        <Table.Row>
            <Table.HeaderCell>TEAM</Table.HeaderCell>
            <Table.HeaderCell>ITEM/PRICE</Table.HeaderCell>
            <Table.HeaderCell>AMOUNT</Table.HeaderCell>
            <Table.HeaderCell>TOTAL</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
    </Table.Header>
    <Table.Body>
    {
        purchases.map( purchase => (
            <PurchaseRow
                purchase={purchase}
                deletePurchase={ (e) => deletePurchases([purchase])}
            />
        ))
    }
    </Table.Body>
</Table>

export default PurchaseList