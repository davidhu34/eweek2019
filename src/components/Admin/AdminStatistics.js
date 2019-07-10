import React, { Component } from 'react'

import { Statistic } from 'semantic-ui-react'

const AdminStatistics = ({
    totalPurchases, totalAmount, totalTotal
}) => <Statistic.Group widths='three' size='mini'>
    <Statistic>
        <Statistic.Label>total</Statistic.Label>
        <Statistic.Value>{totalPurchases}</Statistic.Value>
        <Statistic.Label>purchases</Statistic.Label>
    </Statistic>

    <Statistic>
        <Statistic.Label>total</Statistic.Label>
        <Statistic.Value>{totalAmount}</Statistic.Value>
        <Statistic.Label>items bought</Statistic.Label>
    </Statistic>

    <Statistic>
        <Statistic.Label>total</Statistic.Label>
        <Statistic.Value>{totalTotal}</Statistic.Value>
        <Statistic.Label>$spent</Statistic.Label>
    </Statistic>

</Statistic.Group>


export default AdminStatistics
