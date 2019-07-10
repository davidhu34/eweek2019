import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import { Modal, Container, Loader } from 'semantic-ui-react'

import AdminDashboard from './AdminDashboard';

const Loading = ({ show }) => <Modal basic open={show}>
    <Loader size='large' color='blue' active inline='centered' />
</Modal>

class Admin extends Component {
    state = {
        showLoader: false
    }

    setLoader = (show) => this.setState({ showLoader: show })

    render() {
        const loading = this.state.showLoader
        return <Container>
            <Loading show={loading} />
            <AdminDashboard
                loading={loading}
                setLoader={this.setLoader}
            />
        </Container>
    }
}

export default hot(module)(Admin)
