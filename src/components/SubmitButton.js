import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Button } from 'semantic-ui-react'

import { submitPurchase } from '../actions'

const SubmitButton = ({ ui, submitPurchase}) => {
    return <Container>
        <Button
            disabled={ui.submitting}
            onClick={() => submitPurchase()}>
            SUBMIT
        </Button>
    </Container>
}

export default connect(
    ({ ui }) => ({ ui }),
    dispatch => ({
        submitPurchase: () => dispatch(submitPurchase())
    })
)(SubmitButton)
