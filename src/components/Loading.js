import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Container, Loader } from 'semantic-ui-react'

const Loading = ({ show }) => <Modal basic open={show}>
    <Loader size='large' color='blue' active inline='centered' />
</Modal>

export default connect(
    ({ ui, modal }) => ({ show: !modal.show && ui.submitting })
)(Loading)
