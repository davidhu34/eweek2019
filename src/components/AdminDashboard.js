import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import WordCloud from "react-d3-cloud";
import io from 'socket.io-client'
import axios from 'axios'

import { Container, Loader, Pagination, List, Accordion } from 'semantic-ui-react'

import { API_ROOT } from '../configs'

import { PAGE_MAX_PURCHASES } from '../consts'

const FilterOptions = ({ data, filter, filterAction }) => <List>
    {

        Object.values(data).map( ({ key, name }) => {
            const selected = filter[key]
            return <List.Item
                key={key}
                onClick={(e) => filterAction(key)}
            >
                { name + (selected?'1':'0')}
            </List.Item>
        })
    }
</List>

const FilterArea = (props) => {
    const { filterKey, data, filter, filterAction } = props

    const title = `${filterKey} : ${Object.keys(filter)
            .map(key => data[key].name)
            .join(',')}`

    const panels = [{
        key: filterKey,
        title: title,
        content: <Accordion.Content key={filterKey}>
            <FilterOptions {...props} />
        </Accordion.Content>
    }]

    return <Accordion fluid
        exclusive={false}
        panels={panels}
    />
}

const SchoolFilter = ({ schools, filter, filterSchool }) => <FilterArea
    filterKey={'SCHOOL'}
    data={schools}
    filter={filter}
    filterAction={filterSchool}
/>

const ProductFilter = ({ products, filter, filterProduct }) => <FilterArea
    filterKey={'PRODUCT'}
    data={products}
    filter={filter}
    filterAction={filterProduct}
/>

const PurchasesList = ({ purchases, deletePurchases }) => <List>
    {

        purchases.map( purchase => {
            const { key, count, product, school } = purchase
            return <List.Item key={key}>
                {count + product.name + product.price + school.name}
                <b onClick={ (e) => deletePurchases([purchase]) }>DEL</b>
            </List.Item>
        })
    }
</List>

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
                const filter = {
                    schools: {},
                    products: {}
                }
                this.setState({
                    schools,
                    products,
                    filter,
                    purchases,
                    activePage: 1,
                    totalPages: Math.round(purchases.length/PAGE_MAX_PURCHASES)
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
                    activePage: 1,
                    totalPages: Math.round(purchases.length/PAGE_MAX_PURCHASES)
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
            }
        })
    }

    filterSchool = (key, filter) => this.toggleFilter('schools', key, filter)
    filterProduct = (key, filter) => this.toggleFilter('products', key, filter)

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    getVisiblePurchases = ({ purchases, activePage, filter, union }) => {
        const filters = []
        if (Object.keys(filter.schools).length) {
            filters.push( p => filter.schools[p.school] )
        }
        if (Object.keys(filter.products).length) {
            filters.push( p => filter.products[p.product] )
        }
        const visiblePurchases = filters.length
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

        return visiblePurchases
            .slice(PAGE_MAX_PURCHASES*(activePage-1),PAGE_MAX_PURCHASES*activePage)
    }

    render() {
        const container = this.ref.current || {}
        const { offsetWidth, offsetHeight } = container

        const { activePage, totalPages, schools, products, filter } = this.state

        const purchases = this.getVisiblePurchases(this.state).map( p => {
            const { count } = p
            const key = p._id
            const rev = p._rev
            const product = products[p.product]
            const school = schools[p.school]
            return { key, rev, count, product, school }
        })

        const pagination = <Pagination
            activePage={activePage}
            totalPages={totalPages}
            onPageChange={this.handlePaginationChange}
        />

        return <div ref={this.ref}>
            <Container>
                <SchoolFilter
                    schools={schools}
                    filter={filter.schools}
                    filterSchool={(key) => this.filterSchool(key, filter)}
                />
                <ProductFilter
                    products={products}
                    filter={filter.products}
                    filterProduct={(key) => this.filterProduct(key, filter)}
                />
                {pagination}
                <PurchasesList
                    purchases={purchases}
                    deletePurchases={this.deletePurchases}/>
                {pagination}
            </Container>
        </div>
    }
}

export default hot(module)(AdminDashboard)
