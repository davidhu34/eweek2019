import React, { Component } from 'react'
import WordCloud from 'react-d3-cloud'

class ExpenseCloud extends Component {
    
    fontSizeMapper = word => Math.log2(word.value) * 5;

    rotate = word => 10*(Math.random()-0.5) //word.value % 90;

    render() {
        const { data, width } = this.props
        return <WordCloud
            data={data}
            fontSizeMapper={this.fontSizeMapper}
            rotate={this.rotate}
            width={width} />
    }
}

export default ExpenseCloud
