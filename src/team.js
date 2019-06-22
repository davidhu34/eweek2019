import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Container, Loader } from 'semantic-ui-react'
import { hot } from 'react-hot-loader'
import axios from 'axios'


import { API_ROOT } from './configs'

class Team extends Component {

    getTeamData = (e) => {
        this.setState({ fetching: true })
        return axios.get(`${API_ROOT}/team/${this.state.teamId}`)
        .then( res => {
            const { purchases, team, total } = res.data
            console.log(res.data)
            this.setState({
                purchases, team, total,
                fetching: false
            })
        })
        .catch(err => console.log(err))
    }

    constructor(props) {
        super(props)

        const link = window.location.href
        this.state = {
            teamId: link.substr(link.indexOf('?team=')+6),
            team: null,
            total: null,
            purchases: [],
            fetching: true
        }
    }

    componentDidMount() {
        this.getTeamData()
    }

    render() {
        const { team, purchases, total, fetching } = this.state
        console.log(this.state)
        return <Container>
            <p>{`隊伍: ${team? team.name: '-'} 共花費${total || '-'}元`}</p>

            { purchases.map(p => <p>{ p.product + p.count}</p>) }
            <Loader active inline='centered' />
            { fetching
                ? <Loader active inline='centered' />
                : <p onClick={this.getTeamData}>REFRESH</p>
            }
        </Container>
    }
}

render(
    <Team />,
    document.getElementById('root')
)
