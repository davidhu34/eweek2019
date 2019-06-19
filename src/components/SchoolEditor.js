import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container } from 'semantic-ui-react'

import { initData } from '../actions'
import { MAIN, QRSCAN, EDITSCHOOL } from '../consts/pages'

import { chooseSchool, changePage } from '../actions'

import SchoolList from './SchoolList'

class SchoolEditor extends Component {

    componentDidMount = () => initData()

    render() {
        const { page } = this.props.ui
        const { list, activeIndex } = this.props.school

        const school = list[activeIndex]
        return page === MAIN
            ? <Container>
                <Button onClick={() => this.props.chooseSchool()}>
                    {school? school.name: 'choose school'}
                </Button>
            </Container>
            : page === EDITSCHOOL
                ? <SchoolList />
                : null
    }
}

export default connect(
    ({ ui, school }) => ({ ui, school }),
    dispatch => ({
        chooseSchool: () => dispatch(changePage(EDITSCHOOL)),
    })
)(SchoolEditor)
