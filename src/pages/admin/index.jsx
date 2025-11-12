import React from 'react'
import {useRoutes,Navigate} from 'react-router-dom'
import { Button, Result } from 'antd';
import classes from './index.module.css'

import Sidebar from '../../components/layout/sidebar'
import Header from '../../components/layout/header'

import routes from '../../routes/adminRoutes'
// 管理
export default function Admin() {
  const element=useRoutes([
    { path: '/', element: <Navigate to="home" replace /> },
    ...routes,
    // 404 页面
    { path: '*', 
      element: 
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}/> }
  ])

  return (
    <div className={classes.admin}>
      {/* footer content */}
      <Sidebar Sidebar={classes.Sidebar}/>
      <div className={classes.right}>
        <Header Header={classes.Header}/>
        <div className={classes.Content}>
           {element}
        </div>
        <div className={classes.Footer}>推荐使用谷歌浏览器，可获得更佳页面操作体验</div>
      </div>
    </div>
  )
}
