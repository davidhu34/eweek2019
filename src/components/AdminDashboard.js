import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import WordCloud from "react-d3-cloud";
import io from 'socket.io-client'
import axios from 'axios'

import { Container, Loader, Pagination, List } from 'semantic-ui-react'

import { API_ROOT } from '../configs'

import { PAGE_MAX_PURCHASES } from '../consts'

class AdminDashboard extends Component {

    constructor(props) {
        super(props)
        this.socket = null
        this.ref = React.createRef();
        this.state = {
            schools: {},
            products: {},
            purchases: [],
            activePage: 0,
            totalPages: 0
        }
    }

    componentDidMount() {
        this.setState({ canDraw: true })

        const socket = io(API_ROOT)
        socket.on('connect', () => {
            console.log('connected')
        })

        axios.get(API_ROOT+'/init-admin')
            .then( res => {
                const { schools, products, purchases } = res.data
                this.setState({
                    schools,
                    products,
                    purchases,
                    activePage: 1,
                    totalPages: Math.round(purchases.length/PAGE_MAX_PURCHASES)
                })
            })
            .catch( err => {
                console.log(err)
            })
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    getVisiblePurchases = ({ purchases, activePage }) => {
        return purchases.slice(PAGE_MAX_PURCHASES*(activePage-1),PAGE_MAX_PURCHASES*activePage)
    }

    render() {
        const container = this.ref.current || {}
        const { offsetWidth, offsetHeight } = container

        console.log(container, this.state)

        const { activePage, totalPages, schools, products } = this.state

        const purchases = this.getVisiblePurchases(this.state).map( p => {
            const { count } = p
            const key = p._id
            const product = products[p.product]
            const school = schools[p.school]
            return <List.Item key={key}>
                {count + product.name + product.price + school.name}
            </List.Item>
        })

        const pagination = <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={this.handlePaginationChange}
        />

        return <div ref={this.ref}>
            <Container>
                {pagination}
                <List>
                    {purchases}
                </List>
                {pagination}
            </Container>
        </div>
    }
}

export default hot(module)(AdminDashboard)
