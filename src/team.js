import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { hot } from 'react-hot-loader'
import axios from 'axios'


import { API_ROOT } from './configs'

class Team extends Component {

    getTeamData = (e) => axios.get(`${API_ROOT}/team/${this.state.team}`)
        .then( res => {
            const data = res.data
            this.setState({ data })
        })
        .catch(err => console.log(err))

    constructor(props) {
        super(props)

        const link = window.location.href
        const alias = link.substr(link.indexOf('?team=')+6)
        this.state = {
            team: alias,
            total: null,
            data: null
        }
    }

    componentDidMount() {
        this.getTeamData()
    }

    render() {
        return <Container>
            <p>{'隊伍:' + this.state.team}</p>
            { '$ ' + (this.state.data || 'no team data')}
            <p onClick={this.getTeamData}>REFRESH</p>
        </Container>
    }
}

render(
    <Team />,
    document.getElementById('root')
)
