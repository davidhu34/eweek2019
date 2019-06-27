import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Loader } from 'semantic-ui-react'

const Loading = ({ ui }) => <Container>
    {ui.submitting? <Loader size='large' active inline='centered' />: null}
</Container>

export default connect(
    ({ ui }) => ({ ui })
)(Loading)
