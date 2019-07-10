import React, { Component } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

import { Container, Loader, Pagination } from 'semantic-ui-react'

import { API_ROOT } from '../../configs'
import { PAGE_MAX_PURCHASES } from '../../consts'

import PurchaseList from './PurchaseList' 
import AdminFilters from './AdminFilters'
import { SIGHUP } from 'constants';

class AdminDashboard extends Component {

    constructor(props) {
        super(props)
        this.mounted = false
        this.socket = null
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
        this.mounted = true
        const socket = io(API_ROOT)
        socket.on('connect', () => {
            console.log('connected')
        })
        
        this.initPurchases()
    }
    
    componentWillUnmount() {
        this.mounted = false
        this.props.setLoader(false)
    }

    initPurchases = (data) => {
        this.props.setLoader(true)
        axios.get(API_ROOT+'/init-admin')
        .then( res => {
            if (this.mounted) {
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

                this.props.setLoader(false)
            }
        })
        .catch( err => {
            console.log(err)
        })
    }

    setPurchases = (purchases) => {
        if (this.mounted) {
            this.setState({
                purchases,
                activePage: 1
            })
            this.props.setLoader(false)
        }
    }

    deletePurchases = toDelete => {
        this.props.setLoader(true)
        axios.post(API_ROOT+'/refund', { purchases: toDelete })
        .then( res => this.setPurchases(res.data.purchases))
        .catch( err => {
            console.log(err)
        })
    }

    getFilteredPurchases = ({ purchases, filter, union }) => {
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

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    setFilter = (filter) => {
        this.setState({
            filter,
            activePage: 1
        })
    }

    render() {
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

        return <Container>
            <AdminFilters
                schools={schools}
                products={products}
                filter={filter}
                setFilter={this.setFilter}
            />

            {pagination}
            <PurchaseList
                purchases={purchases}
                deletePurchases={this.deletePurchases}
            />
            {totalPages < 2? null: pagination}
        </Container>
    }
}

export default AdminDashboard
