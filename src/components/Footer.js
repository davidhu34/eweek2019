import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Sidebar, Container, Grid, Button } from 'semantic-ui-react'

import { footerDispatchers } from '../actions'
import { MAIN, HISTORY, EDITPURCHASE, EDITSCHOOL } from '../consts/pages'

class Footer extends Component {

    getButtons = page => {
        switch (page) {
            case EDITPURCHASE:
                return [{
                    text: 'CANCEL',
                    onClick: () => this.props.cartCancel()
                },{
                    text: 'SAVE',
                    onClick: () => this.props.cartPut()
                }]
            case EDITSCHOOL:
                return [{
                    text: 'CANCEL',
                    onClick: () => this.props.schoolCancel()
                }]
            case HISTORY:
                return [{
                    text: 'BACK',
                    onClick: () => this.props.backToMain()
                }]
            case MAIN:
                return [{
                    text: 'CLEAR ALL',
                    onClick: () => this.props.cartClear()
                },{
                    text: 'BUY ALL',
                    onClick: () => this.props.cartSubmit()
                }]
            default:
                return []
        }
    }

    render() {
        const { ui } = this.props
        const buttons = this.getButtons(ui.page)

        return <Sidebar visible={Boolean(ui.inited)} direction='bottom'>
            <Grid padded>
            <Grid.Row columns={buttons.length || 1}>
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
