import React, { useState } from 'react'
import { MinusOutlined, PlusOutlined,ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Flex, Progress, Space,Card, Col, Row, Statistic,Radio,Timeline } from 'antd';
import classes from './index.module.css'

export default function Home() {
  const [percent, setPercent] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
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

  // 模拟数据
  const announcementsData = [
  {
    id: 1,
    title: "系统维护通知",
    content: "为了提升系统性能，我们将于本周六凌晨2:00-4:00进行系统维护。在此期间系统可能无法访问，请提前安排好工作。"
  },
  {
    id: 2,
    title: "新功能上线公告",
    content: "本次更新新增了数据导出功能，支持Excel和PDF格式。同时优化了搜索性能，提升了用户体验。欢迎大家使用并提供宝贵意见。"
  },
  {
    id: 3,
    title: "关于数据备份的重要提醒",
    content: "请各位用户定期备份重要数据。系统虽然会自动备份，但建议重要操作后手动导出数据备份，以防万一。"
  },
  {
    id: 4,
    title: "春节放假安排",
    content: "根据国家法定节假日安排，公司将于2月10日至2月17日放假，2月18日正常上班。放假期间技术支持照常服务。"
  },
  {
    id: 5,
    title: "系统使用规范更新",
    content: "更新了系统使用规范，请各位用户仔细阅读。主要更新内容包括数据安全管理、操作权限说明等。"
  },
  {
    id: 6,
    title: "旧版本停用通知",
    content: "系统v1.0版本将于下个月停止维护，请还在使用旧版本的用户尽快升级到最新版本v2.0。"
  },
  {
    id: 7,
    title: "安全漏洞修复完成",
    content: "近期发现的安全漏洞已经修复完成，系统安全性得到进一步提升。建议所有用户修改密码以确保账户安全。"
  }]

  const handleSearch=()=>{
    if (!searchKeyword.trim()) {
      alert('请输入搜索关键字');
      return;
    }

    const keyword = searchKeyword.toLowerCase();
    const results = announcementsData.filter(announcement => 
      announcement.title.toLowerCase().includes(keyword) || 
      announcement.content.toLowerCase().includes(keyword)
    );

    setSearchResults(results);

    if (results.length === 0) {
      alert(`没有找到包含"${searchKeyword}"的公告`);
    }
  };


  return (
    <div>
      <div className={classes.home}>欢迎来到后台管理系统</div>
      <div className={classes.notice}>
        <div style={{textAlign: 'center',fontWeight:'500',fontSize: '18px',padding:'0 0 6px 0'}}>公告栏</div>
       <div style={{textAlign: 'center'}}>
         <span>请输入关键字进行查找：</span>
         <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}/>
         <button onClick={handleSearch}>确定</button>
       </div>       
      </div>
       {/* 搜索结果展示 */}
      {searchResults.length > 0 && (
        <div>
          {searchResults.map(announcement => (
            <div key={announcement.id} className={classes.announcement}>
              <div>标题：{announcement.title}</div>
              <div style={{fontSize:'14px',paddingTop:'5px'}}>内容{announcement.content}</div>
            </div>
          ))}
        </div>
      )}

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
