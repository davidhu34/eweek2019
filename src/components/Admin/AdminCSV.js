import React from 'react'
import { CSVLink } from "react-csv"

import { Icon } from 'semantic-ui-react'

const HEADERS = [
  { label: "學校", key: "school" },
  { label: "商品", key: "product" },
  { label: "單價", key: "price" },
  { label: "數量", key: "count" },
  { label: "總價", key: "total" },
  { label: "時間", key: "time" }
]

const HEADERS_SINGLE = [
    { label: "學校", key: "school" },
    { label: "商品", key: "product" },
    { label: "數量", key: "count" },
]

const AdminCSV = ({ purchases, schools, products, singleItem }) => {
    const now = new Date()
    
    const csvData = []
    purchases.forEach( p => {
        const product = products[p.product]
        const school = schools[p.school]
        const t = new Date(p.time || now.getTime())

        const timeStr = t.toLocaleString()//.slice(0,10)

        const baseData = {
            school: school.name,
            product: product.name,
            price: product.price,
            time: timeStr
        }

        if (singleItem) for (let i = 0; i < p.count; i++) {
            csvData.push({
                ...baseData,
                count: 1,
                total: product.price
            })
        } else csvData.push({
            ...baseData,
            count: p.count,
            total: product.price*p.count
        })
    })

    return <CSVLink
        filename={`EWeekData.csv`}
        data={csvData}
        headers={singleItem? HEADERS_SINGLE: HEADERS}
        style={{
            borderRadius: 100,
            borderColor: 'navy',
            borderStyle: 'solid',
            padding: 10,
            color: 'navy'
        }}>
        <Icon name='download' />
        {`Export ${singleItem? 'Single-Item ': ''}CSV`}
    </CSVLink>
}

export default AdminCSV
