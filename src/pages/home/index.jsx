import React, { useState } from 'react'
import { MinusOutlined, PlusOutlined,ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Flex, Progress, Space,Card, Col, Row, Statistic,Radio,Timeline } from 'antd';
import classes from './index.module.css'

export default function Home() {
  const [percent, setPercent] = useState(0);
  const increase = () => {
    setPercent(prevPercent => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  const decline = () => {
    setPercent(prevPercent => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };

  const [mode, setMode] = useState('left');
  const onChange = e => {
    setMode(e.target.value);
  };

  return (
    <div>
      <div className={classes.home}>欢迎来到后台管理系统</div>
      <div className={classes.container}>
        <div className={classes.progress}>
        <span>1. 项目进度：</span>
        <div>
        <Flex vertical gap="small" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Flex vertical gap="small">
            <Progress percent={percent} type="line" className={classes.line} />
            <Progress percent={percent} type="circle" />
          </Flex>
          <Space.Compact>
            <Button onClick={decline} icon={<MinusOutlined style={{paddingTop:'26px'}}/>} style={{marginTop:'20px'}}/>
            <Button onClick={increase} icon={<PlusOutlined style={{paddingTop:'26px'}}/>} style={{margin:'20px 120px 0 0'}}/>
          </Space.Compact>
        </Flex>
        </div>
        </div>
        <div className={classes.statistic}>
          <span>2. 上季度数据</span>
          <div style={{transform: 'scale(0.9)'}}>
            <Row gutter={16}>
            <Col span={12}>
              <Card variant="borderless">
                <Statistic
                  title="活跃客户"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card variant="borderless">
                <Statistic
                  title="游客"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          </div>
        </div>
      </div>
      <div className={classes.timeline}>
       <span> 3. 项目时间轴</span>
        <div>
          <>
            <Radio.Group
              onChange={onChange}
              value={mode}
              style={{
                marginBottom: 20,
              }}
            >
              <Radio value="left">左分布</Radio>
              <Radio value="right">右分布</Radio>
              <Radio value="alternate">交替分布</Radio>
            </Radio.Group>
            <Timeline
              mode={mode}
              items={[
                {
                  label: '2025-09-01',
                  children: '创建项目',
                },
                {
                  label: '2025-09-02 09:12:11',
                  children: '解决分工问题',
                },
                {
                  children: '技术测试',
                },
                {
                  label: '2025-09-11',
                  children: '...',
                },
                {
                  label: '2025-09-15',
                  children: '...',
                },
              ]}
            />
          </>
        </div>
      </div>
    </div>
  )
}
