import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import io from 'socket.io-client'
import axios from 'axios'

import { API_ROOT } from '../../configs'

import ExpenseCloud from './ExpenseCloud'
import CostRankingList from './CostRankingList'

class Dashboard extends Component {
    
    _mounted = false
    socket = null

    constructor(props) {
        super(props)
        
        this.ref = React.createRef();
        this.state = {
            schools: [],
            data: []
        }
    }

    balanceData = (schools, balance) => schools.map( (s,i) => {
        const value = balance[s._id] || 0// (i+1)*100
        return {
            key: s._id,
            text: `${s.nickname || s.name} : ${value.toString()} 元`,
            name: s.name,
            nickname: s.nickname,
            total: value,
            value: (value+1)*12
        }
    }).sort( (a,b) => a.value - b.value )

    componentDidMount() {
        this._mounted = true

        const socket = io(API_ROOT)
        socket.on('connect', () => {
            console.log('connected')
        })
        socket.on('teamtotal', (data) => {
            this.setState({ data: this.balanceData(this.state.schools, data) })
        })
        this.socket = socket

        axios.get(API_ROOT+'/init-dashboard')
            .then( res => {
                if (this._mounted) {
                    const { schools, balance } = res.data
                    this.setState({
                        schools,
                        data: this.balanceData(schools, balance)
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentWillUnmount() {
        this._mounted = false
        this.socket.disconnect()
    }

    render() {
        const { data } = this.state
        return <React.Fragment>
            { this._mounted
                ? <ExpenseCloud
                    data={data}
                    width={window.innerWidth}
                    readyCloud={this.readyCloud} />
                : null
            }
            <CostRankingList list={data} />
        </React.Fragment>
    }
}

export default hot(module)(Dashboard)
