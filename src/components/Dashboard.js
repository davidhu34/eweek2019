import React, { Component } from 'react'
import { Container, Loader } from 'semantic-ui-react'
import { hot } from 'react-hot-loader'
import WordCloud from "react-d3-cloud";
import io from 'socket.io-client'
import axios from 'axios'

const fontSizeMapper = word => Math.log2(word.value) * 5;

const rotate = word => 10*(Math.random()-0.5)//word.value % 90;

import { API_ROOT } from '../configs'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.socket = null
        this.ref = React.createRef();
        this.state = {
            schools: [],
            data: [],
            canDraw: false
        }
    }

    balanceData = (schools, balance) => schools.map( (s,i) => {
        const value = balance[s._id] || 0// (i+1)*100
        return {
            text: `${s.name} : ${value.toString()} 元`,
            value: value+1
        }
    })

    componentDidMount() {
        this.setState({ canDraw: true })

        const socket = io(API_ROOT)
        socket.on('connect', () => {
            console.log('connected')
        })
        socket.on('teamtotal', (data) => {
            this.setState({ data: this.balanceData(this.state.schools, data) })
        })

        axios.get(API_ROOT+'/init-dashboard')
            .then( res => {
                const { schools, balance } = res.data
                this.setState({
                    schools,
                    data: this.balanceData(schools, balance)
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const container = this.ref.current || {}
        console.log(container, this.state)
        const { offsetWidth, offsetHeight } = container
        return <div ref={this.ref}>
            <Container>
                asdfsadfjk
                { this.state.canDraw
                    ? <WordCloud
                        data={this.state.data}
                        fontSizeMapper={fontSizeMapper}
                        rotate={rotate}
                        width={offsetWidth} />
                    : null
                }
            </Container>
        </div>
    }
}

export default hot(module)(Dashboard)
