import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, List } from 'semantic-ui-react'
import QrReader from 'react-qr-reader'

import { selectSchool } from '../actions'

class SchoolList extends Component {

    handleScan = (data) => {
        if (!data) return

        const strs = data.split('/')
        const alias = strs[strs.length-1]
        const { school, selectSchool } = this.props

        for (let i = 0; i < school.list.length; i++) {
            if (school.list[i].alias === alias) {
                selectSchool(i)
                break
            }
        }
    }

    handleError = () => {

    }

    render() {
        const { school, selectSchool } = this.props
        const schoolList = school.list.map( (s, index) => {
            return <List.Item
                key={s.alias}
                onClick={ (e) => selectSchool(index)}
            >
                {`${s.name} ${school.activeIndex === index? '*': ''}`}
            </List.Item>
        })
        return <Container>
            <QrReader
                delay={300}
                showViewFinder={false}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: '100%' }} />
            <List>{schoolList}</List>
        </Container>
    }
}

export default connect(
    ({ school }) => ({ school }),
    dispatch => ({
        selectSchool: (index) => dispatch(selectSchool(index))
    })
)(SchoolList)
