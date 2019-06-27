import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Container, Header, Button, Icon, Divider } from 'semantic-ui-react'

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
                ? <Button basic
                    size='large'
                    onClick={() => showHistory(activeSchool._id)}>
                    <Icon name='history' />購買紀錄
                </Button>
                : null
            }
            <Button basic
                size='large'
                onClick={() => chooseSchool()}>
                <Icon name='qrcode'/>選擇學校
            </Button>
        </Fragment>
        : page === EDITSCHOOL? <SchoolList />
        : page === HISTORY? <HistoryDisplay />
        : null

    return <Container textAlign='center'>
        <Divider hidden />
        <Header>{activeSchool? activeSchool.name: ''}</Header>
        {editor}
        <Divider hidden />
    </Container>
}

export default connect(
    ({ ui, school }) => ({ ui, school }),
    dispatch => ({
        chooseSchool: () => dispatch(changePage(EDITSCHOOL)),
        showHistory: (school) => dispatch(showHistory(school))
    })
)(SchoolEditor)
