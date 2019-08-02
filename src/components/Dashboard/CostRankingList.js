import React from 'react'

import { Table, Container } from 'semantic-ui-react'

const CostRanking = ({ data }) => {
    const { total, name, nickname } = data
    return <Table.Row>
        <Table.Cell>{total}</Table.Cell>
        <Table.Cell>{ 1000 - total }</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{nickname}</Table.Cell>
    </Table.Row>
}

const CostRankingList = ({ list }) => <Container fluid
    style={{
        position: 'absolute',
        top: window.innerHeight
    }}
>
    <Table >
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>花費</Table.HeaderCell>
                <Table.HeaderCell>餘額</Table.HeaderCell>
                <Table.HeaderCell>學校</Table.HeaderCell>
                <Table.HeaderCell>隊名</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
        {
            list.map( data => (
                <CostRanking
                    key={data.key}
                    data={data}
                />
            ))
        }
        </Table.Body>
    </Table>
</Container>

export default CostRankingList