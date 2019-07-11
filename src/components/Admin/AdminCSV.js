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

const AdminCSV = ({ purchases, schools, products }) => {
    const now = new Date()
    const csvData = purchases.map( p => {
        const product = products[p.product]
        const school = schools[p.school]
        const t = new Date(p.time || now.getTime())

        const timeStr = t.toLocaleString('zh-TW').slice(0,10)
        return {
            school: school.name,
            product: product.name,
            price: product.price,
            count: p.count,
            total: product.price*p.count,
            time: timeStr
        }
    })

    return <CSVLink
        filename={`EWeekData.csv`}
        data={csvData}
        headers={HEADERS}
        style={{
            borderRadius: 100,
            borderColor: 'navy',
            borderStyle: 'solid',
            padding: 10,
            color: 'navy'
        }}>
        <Icon name='download' /> export CSV
    </CSVLink>
}

export default AdminCSV
