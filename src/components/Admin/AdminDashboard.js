import React, { Component } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

import { Container, Loader, Pagination, Button } from 'semantic-ui-react'

import { API_ROOT } from '../../configs'
import { PAGE_MAX_PURCHASES } from '../../consts'

import PurchaseList from './PurchaseList'
import AdminFilters from './AdminFilters'
import AdminStatistics from './AdminStatistics'
import AdminCSV from './AdminCSV'

class AdminDashboard extends Component {

    constructor(props) {
        super(props)
        this.mounted = false
        this.socket = null
        this.state = {
            schools: {},
            products: {},
            purchases: [],
            behind: true,

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
        this.socket = this.connectSocket()
        this.initPurchases()
    }

    componentWillUnmount() {
        this.mounted = false
        if (this.socket) this.socket.disconnect()
        this.props.setLoader(false)
    }

    connectSocket = () => {
        const socket = io(API_ROOT)
        socket.on('connect', () => {
            console.log('connected')
        })
        socket.on('teamtotal', (balance) => {
            this.setState({ behind: true })
        })
        return socket
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
                    behind: false,
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
                behind: false,
                activePage: 1
            })
            this.props.setLoader(false)
        }
    }

    refreshPurchases = () => {
        this.props.setLoader(true)
        axios.get(API_ROOT+'/init-admin')
        .then( res => this.setPurchases(res.data.purchases))
        .catch( err => {
            console.log(err)
        })
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

    setFilter = (filter) => this.setState({ filter, activePage: 1 })

    render() {
        const { activePage, schools, products, filter, behind } = this.state
        const { loading } = this.props

        let totalAmount = 0
        let totalTotal = 0
        const filteredPurchases = this.getFilteredPurchases(this.state)
            .map( p => {
                totalAmount += p.count
                totalTotal += products[p.product].price*p.count
                return p
            })

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
        const pagination = totalPages < 2
            ? null
            : <Pagination
                activePage={activePage}
                totalPages={totalPages}
                onPageChange={this.handlePaginationChange}
            />

        return <Container>

            <Button primary
                circular
                icon='sync'
                loading={loading}
                content={behind? 'New Updates': ''}
                onClick={ (e) => {
                    if (!loading) this.refreshPurchases()
                }}
            />

            <AdminCSV
                schools={schools}
                products={products}
                purchases={this.state.purchases}
            />
            <AdminCSV
                schools={schools}
                products={products}
                purchases={this.state.purchases}
                singleItem
            />

            <AdminFilters
                schools={schools}
                products={products}
                filter={filter}
                setFilter={this.setFilter}
            />

            <AdminStatistics
                totalPurchases={filteredPurchases.length}
                totalAmount={totalAmount}
                totalTotal={totalTotal}
            />

            {pagination}
            <PurchaseList
                purchases={purchases}
                deletePurchases={this.deletePurchases}
            />
            {pagination}
        </Container>
    }
}

export default AdminDashboard
