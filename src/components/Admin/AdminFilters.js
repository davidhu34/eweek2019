import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import FilterArea from './FilterArea'

class AdminFilters extends Component {
    
    toggleFilter = (type, key, filter) => {
        let typeFilter = filter[type]

        if (typeFilter[key]) delete typeFilter[key]
        else typeFilter[key] = true

        this.props.setFilter({
            ...filter,
            [type]: typeFilter
        })
    }

    filterSchool = (key, filter) => this.toggleFilter('schools', key, filter)

    filterProduct = (key, filter) => this.toggleFilter('products', key, filter)

    render() {
        const { schools, products, filter } = this.props
        
        return <Container>
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
        </Container>
    }

}

export default AdminFilters