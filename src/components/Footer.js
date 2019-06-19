import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar, Menu, Container, Grid, Button } from 'semantic-ui-react'

import { footerDispatchers } from '../actions'

class Footer extends Component {

    componentDidMount() {
        console.log(this.props)
    }
    
    getButtons = ui => {
        if (ui.scanning) {
            return [{
                text: 'BACK',
                onClick: () => {}
            }]
        } else if (ui.editing) {
            return [{
                text: 'CANCEL',
                onClick: () => this.props.cartCancel()
            },{
                text: 'ADD',
                onClick: () => this.props.cartPut()
            }]
        } else {
            return [{
                text: 'CLEAR ALL',
                onClick: () => this.props.cartClear()
            },{
                text: 'BUY ALL',
                onClick: () => this.props.cartSubmit()
            }]
        }
    }

    render() {
        const { ui } = this.props
        const buttons = this.getButtons(ui)

        return <Sidebar visible={Boolean(ui.inited)} direction='bottom'>
            <Grid padded>
            <Grid.Row columns={buttons.length}>
                {
                    buttons.map( b => <Grid.Column key={b.text} textAlign='center'>
                        <Button onClick={b.onClick}>{b.text}</Button>
                    </Grid.Column>)
                }
            </Grid.Row>
            </Grid>
        </Sidebar>
    }
}

export default connect(
    ({ ui }) => ({ ui }),
    dispatch => footerDispatchers(dispatch)
)(Footer)
