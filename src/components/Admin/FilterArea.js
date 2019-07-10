import React, { Component } from 'react'

import { Container, List, Accordion, Button } from 'semantic-ui-react'

const FilterOptions = ({ data, filter, filterAction }) => <Container>
    {

        Object.values(data)
        .map( ({ key, name }) => {
            const selected = filter[key]
            return <Button
                primary={selected}
                key={key}
                onClick={(e) => filterAction(key)}
            >
                {name}
            </Button>
        })
    }
</Container>

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

export default FilterArea