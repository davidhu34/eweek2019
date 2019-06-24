import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Button, Divider } from 'semantic-ui-react'

import { MAIN, HISTORY, EDITSCHOOL } from '../consts/pages'

import { chooseSchool, changePage, showHistory } from '../actions'

import SchoolList from './SchoolList'
import HistoryDisplay from './HistoryDisplay'

const SchoolEditor = ({ ui, school, chooseSchool, showHistory }) => {

    const { page, inited } = ui
    const { list, activeIndex } = school

    const activeSchool = list[activeIndex]
    const editor = inited && page === MAIN
        ? <Fragment>
            { activeSchool
                ? <Button onClick={() => showHistory(activeSchool._id)}>
                    show history
                </Button>
                : null
            }
            <Button onClick={() => chooseSchool()}>
                choose school
            </Button>
            <Divider hidden />
        </Fragment>
        : page === EDITSCHOOL? <SchoolList />
        : page === HISTORY? <HistoryDisplay />
        : null

    return <Container textAlign='center'>
        <Header>{activeSchool? activeSchool.name: ''}</Header>
        {editor}
    </Container>
}

export default connect(
    ({ ui, school }) => ({ ui, school }),
    dispatch => ({
        chooseSchool: () => dispatch(changePage(EDITSCHOOL)),
        showHistory: (school) => dispatch(showHistory(school))
    })
)(SchoolEditor)
