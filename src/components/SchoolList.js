import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import { selectSchool } from '../actions'

const SchoolList = ({ school, selectSchool }) => <Container>
    {school.list.map( (s, index) => <div
        onClick={ (e) => selectSchool(index)}
        key={s.alias}>
        {s.name}
    </div>)}
</Container>

export default connect(
    ({ school }) => ({ school }),
    dispatch => ({
        selectSchool: (index) => dispatch(selectSchool(index))
    })
)(SchoolList)
