import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd'
import { Chart, Axis, Tooltip, Geom, Label } from 'bizcharts'
import styles from './FollowerGraph.less'
const DataSet = require('@antv/data-set')

const cols = {
  date: { alias: '日期' },
  dianzan: { alias: '总点赞数' },
}

class Graph extends Component {
  render() {
    const { dianzanGraph } = this.props

    const ds = new DataSet()
    const dv = ds.createView().source(dianzanGraph)
    dv.transform({
      // 把数据行逆序排列
      type: 'reverse',
    })

    return (
      <Card className={styles.container}>
        <Chart height={450} data={dv} scale={cols} forceFit>
          <div className={styles.titleWrapper}>总点赞数增长趋势</div>
          <Axis title name="date" />
          <Axis title name="dianzan" />
          <Tooltip
            crosshairs={{
              type: 'cross',
            }}
          />
          <Geom type="line" position="date*dianzan" size={2} color="#0099CC" shape="smooth">
            <Label content="dianzan" formatter={val => `${val}`} />
          </Geom>
          <Geom type="point" shape="circle" position="date*dianzan" color="#0099CC" size={5} />
        </Chart>
      </Card>
    )
  }
}

Graph.propTypes = {
  dianzanGraph: PropTypes.array.isRequired,
}

export default Graph
// color
// http://tool.c7sky.com/webcolor/
