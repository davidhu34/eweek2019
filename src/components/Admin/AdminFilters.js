import React, { Component } from 'react'
import { Container, Button } from 'semantic-ui-react'

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

    clearSchoolFilter = (filter) => this.props.setFilter({ ...filter, schools: {}})
    clearProductFilter = (filter) => this.props.setFilter({ ...filter, products: {}})

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
            { Object.keys(filter.schools).length
                ? <Button primary
                    circular
                    content={'Clear School Filters'}
                    onClick={ (e) => this.clearSchoolFilter(filter)}
                />
                :null
            }
            { Object.keys(filter.products).length
                ? <Button primary
                    circular
                    content={'Clear Product Filters'}
                    onClick={ (e) => this.clearProductFilter(filter)}
                />
                :null
            }
        </Container>
    }

}

export default AdminFilters
