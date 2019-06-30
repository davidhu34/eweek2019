import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List, Button } from 'semantic-ui-react'
import QrReader from 'react-qr-reader'

import { selectSchool } from '../actions'

class SchoolList extends Component {

    handleScan = (data) => {
        if (!data) return

        const id = data.substr(data.indexOf('?team=')+6)
        const { school, selectSchool } = this.props

        for (let i = 0; i < school.list.length; i++) {
            if (school.list[i]._id === id) {
                selectSchool(i)
                break
            }
        }
    }

    handleError = () => {}

    render() {
        const { school, selectSchool } = this.props
        const schoolList = school.list.map( (s, index) => {
            const selected = school.activeIndex === index
            return <List.Item
                key={s.alias}
                onClick={ (e) => selectSchool(index)}
            >
                <Button basic={!selected}
                    color='orange'
                    className='dddd'>
                    {s.name}
                </Button>
            </List.Item>
        })
        return <Container>
            <QrReader
                delay={300}
                showViewFinder={false}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%' }} />
            <List className='ddd'>{schoolList}</List>
        </Container>
    }
}

export default connect(
    ({ school }) => ({ school }),
    dispatch => ({
        selectSchool: (index) => dispatch(selectSchool(index))
    })
)(SchoolList)
