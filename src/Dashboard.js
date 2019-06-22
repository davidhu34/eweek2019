import React, { Component } from 'react'
import { Container, Loader } from 'semantic-ui-react'
import { hot } from 'react-hot-loader'
import WordCloud from "react-d3-cloud";
import axios from 'axios'

const fontSizeMapper = word => Math.log2(word.value) * 5;

const rotate = word => 10*(Math.random()-0.5)//word.value % 90;

import { API_ROOT } from './configs'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.ref = React.createRef();
        this.state = {
            data: [
                { text: "Hey", value: 1000 },
                { text: "lol", value: 200 },
                { text: "first impression", value: 800 },
                { text: "very cool", value: 1000000 },
                { text: "duck", value: 10 }
            ],
            canDraw: false
        }
    }

    componentDidMount() {
        this.setState({ canDraw: true })
        console.log(this.ref)
        axios.get(API_ROOT+'/init')
            .then(res => {
                const { schools, products } = res.data
                console.log(schools)
                this.setState({
                    data: schools.map( (s,i) => ({
                        text: s.name+':'+((i+1)*100).toString()+'元',
                        value: (i+1)*100
                    }))
                })
            })
            .catch(err => {
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