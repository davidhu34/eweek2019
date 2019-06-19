import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Statistic, Button } from 'semantic-ui-react'

import { setCount } from '../actions'

const CountPanel = ({ count, setCount }) => <Container textAlign='center'>
    <Grid centered>
        <Grid.Row>
            <Statistic horizontal label={'個'} value={count} />
        </Grid.Row>
        <Grid.Row columns={4}>
            {['-5', '-1', '+1', '+5'].map( value => <Grid.Column key={value}>
                <Button circular
                    size='large'
                    children={value}
                    onClick={ e => {
                        const n = Number(value)
                        const result = Math.max(1, Math.min(count+n, 20))
                        setCount(result)
                    }} />
            </Grid.Column>)}
        </Grid.Row>
    </Grid>
</Container>


export default connect(
  ({ purchase }) => ({ count: purchase.count }),
  dispatch => ({
      setCount: (index) => dispatch(setCount(index))
  })
)(CountPanel)
