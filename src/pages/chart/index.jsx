import React from 'react'
import { Line,Pie,Liquid } from '@ant-design/plots'
import { createRoot } from 'react-dom/client'
import classes from './index.module.css'

export default function Chart() {
  
  const data = [
    { year: '2011', value: 30 },
    { year: '2012', value: 40 },
    { year: '2013', value: 35 },
    { year: '2014', value: 50 },
    { year: '2015', value: 49 },
    { year: '2016', value: 60 },
    { year: '2017', value: 70 },
    { year: '2018', value: 90 },
    { year: '2019', value: 130 },
  ]
  const lineConfig = {
    data,
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    }
  };
  const pieConfig = {
    data: [
      { type: '一', value: 47 },
      { type: '二', value: 55 },
      { type: '三', value: 38 },
      { type: '四', value: 75 },
      { type: '其他', value: 45 },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    }
  };
  const liquidConfig = {
    percent: 0.4,
    style: {
      outlineBorder: 4,
      outlineDistance: 8,
      waveLength: 128,
    }
  };

  

  return (
   <div className={classes.chart}>
     <div className={classes.line} style={{marginBottom:'20px'}}>
      <span>线性图</span>
      <Line {...lineConfig} />
     </div>
    <div className={classes.pie} style={{marginBottom:'20px'}}>
      <span>饼状图</span>
      <Pie {...pieConfig} />
    </div>
    <div className={classes.liquid}>
      <span>水波图</span>
      <Liquid {...liquidConfig} />
    </div>
   </div>
  )
}
