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
                    className='bbb'
                    onClick={() => showHistory(activeSchool._id)}>
                    <Icon name='history' />購買紀錄
                </Button>
                : null
            }
            <Button basic
                size='large'
                className='bbb'
                onClick={() => chooseSchool()}>
                <Icon name='qrcode'/>選擇學校
            </Button>
            <Divider hidden />
        </Fragment>
        : page === EDITSCHOOL? <SchoolList />
        : page === HISTORY? <HistoryDisplay />
        : null
    
    const name = activeSchool? activeSchool.name: ''
    const nickname = activeSchool? activeSchool.nickname: ''
    return <Container textAlign='center'>
        <Divider hidden />
        {
            name? <React.Fragment>
                <Header className='fff'>{nickname || name}</Header>
                <Header className='ccc'>{name}</Header>
                </React.Fragment>
            : null
        }
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
