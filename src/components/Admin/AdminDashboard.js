import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import WordCloud from "react-d3-cloud";
import io from 'socket.io-client'
import axios from 'axios'

import { Container, Loader, Pagination, List, Accordion } from 'semantic-ui-react'

import { API_ROOT } from '../../configs'
import { PAGE_MAX_PURCHASES } from '../../consts'

import FilterArea from './FilterArea'
import PurchaseList from './PurchaseList' 

class AdminDashboard extends Component {

    constructor(props) {
        super(props)
        this.socket = null
        this.ref = React.createRef();
        this.state = {
            schools: {},
            products: {},
            purchases: [],
            union: false,
            filter: {
                schools: {},
                products: {}
            },
            activePage: 0
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
                const filter = {
                    schools: {},
                    products: {}
                }
                this.setState({
                    schools,
                    products,
                    filter,
                    purchases,
                    activePage: 1
                })
            })
            .catch( err => {
                console.log(err)
            })
    }

    deletePurchases = toDelete => {
        axios.post(API_ROOT+'/refund', { purchases: toDelete })
            .then( res => {
                const { purchases } = res.data
                this.setState({
                    purchases,
                    activePage: 1
                })
            })
            .catch( err => {
                console.log(err)
            })
    }

    toggleFilter = (type, key, filter) => {
        let typeFilter = filter[type]

        if (typeFilter[key]) delete typeFilter[key]
        else typeFilter[key] = true

        this.setState({
            filter: {
                ...filter,
                [type]: typeFilter
            },
            activePage: 1
        })
    }

    filterSchool = (key, filter) => this.toggleFilter('schools', key, filter)
    filterProduct = (key, filter) => this.toggleFilter('products', key, filter)

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    getFilteredPurchases = ({ purchases, activePage, filter, union }) => {
        const filters = []
        if (Object.keys(filter.schools).length) {
            filters.push( p => filter.schools[p.school] )
        }
        if (Object.keys(filter.products).length) {
            filters.push( p => filter.products[p.product] )
        }

        return filters.length
            ? [...purchases].filter( purchase => {
                const defaultValid = !union
                for (let i = 0; i < filters.length; i++) {
                    const valid = filters[i](purchase)
                    if (union && valid) return true
                    else if (!union && !valid) return false
                }
                return defaultValid
            })
            : [...purchases]
    }

    render() {
        const container = this.ref.current || {}
        const { offsetWidth, offsetHeight } = container

        const { activePage, schools, products, filter } = this.state

        const filteredPurchases = this.getFilteredPurchases(this.state)
        const purchases = filteredPurchases.slice(
                PAGE_MAX_PURCHASES*(activePage-1),
                PAGE_MAX_PURCHASES*activePage
            ).map( p => {
                const { count } = p
                const key = p._id
                const rev = p._rev
                const product = products[p.product]
                const school = schools[p.school]
                return { key, rev, count, product, school }
            })
        
        const totalPages = Math.round(filteredPurchases.length/PAGE_MAX_PURCHASES)
        const pagination = <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={this.handlePaginationChange}
        />

        return <div ref={this.ref}>
            <Container>
                <FilterArea
                    filterKey={'SCHOOL'}
                    data={schools}
                    filter={filter.schools}
                    filterAction={(key) => this.filterSchool(key, filter)}
                />
                <FilterArea
                    filterKey={'PRODUCT'}
                    data={products}
                    filter={filter.products}
                    filterAction={(key) => this.filterProduct(key, filter)}
                />

                {pagination}
                <PurchaseList
                    purchases={purchases}
                    deletePurchases={this.deletePurchases}
                />
                {totalPages < 2? null: pagination}
            </Container>
        </div>
    }
}

export default hot(module)(AdminDashboard)
