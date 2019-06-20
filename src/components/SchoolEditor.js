import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Container, Divider } from 'semantic-ui-react'

import { MAIN, QRSCAN, EDITSCHOOL } from '../consts/pages'

import { chooseSchool, changePage } from '../actions'

import SchoolList from './SchoolList'

const SchoolEditor = ({ ui, school, chooseSchool }) => {

    const { page, inited } = ui
    const { list, activeIndex } = school

    const activeSchool = list[activeIndex]
    return page === MAIN && inited
        ? <Container textAlign='center'>
            <Button onClick={() => chooseSchool()}>
                {activeSchool? activeSchool.name: 'choose school'}
            </Button>
            <Divider section hidden></Divider>
        </Container>
        : page === EDITSCHOOL
            ? <SchoolList />
            : null
}

export default connect(
    ({ ui, school }) => ({ ui, school }),
    dispatch => ({
        chooseSchool: () => dispatch(changePage(EDITSCHOOL)),
    })
)(SchoolEditor)
