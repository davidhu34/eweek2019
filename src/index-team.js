import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import { Segment, Header, Container, List, Button, Loader } from 'semantic-ui-react'
import axios from 'axios'

import { API_ROOT } from './configs'

class Team extends Component {

    getTeamData = (fetching) => {
        if (fetching) return

        this.setState({ fetching: true })
        return axios.get(`${API_ROOT}/teamhistory/${this.state.teamId}`)
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
        const items = fetching? []
        : purchases.map( (purchase, i) => {
            const { product, count, key } = purchase
            return <List.Item key={key}>
                {`${product.name} ${count}個 共${product.price*count}元`}
            </List.Item>
        })

        return <div>
            <Segment inverted color='orange' className='aaa'>
                <Header inverted textAlign='center'>
                    EWeek 物品購買紀錄
                </Header>
            </Segment>

            <Container textAlign='center'>
                { team
                    ? <Fragment>
                        <Header className='ccc'>
                            {team.name}
                        </Header>
                        <Header className='fff'>
                            {`總共花費：${total} 元`}
                        </Header>
                    </Fragment>
                    : null
                }

                <Button basic
                    circular
                    loading={fetching}
                    color='blue'
                    size='big'
                    icon='sync'
                    onClick={ () => this.getTeamData(fetching)}
                />

                <List className='ggg'>{items}</List>
            </Container>
        </div>
    }
}

render(
    <Team />,
    document.getElementById('root')
)
