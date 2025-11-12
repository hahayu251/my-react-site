import React,{useState,useEffect,createContext} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import {menuData} from '../sidebar'
import classes from './index.module.css'
import {Modal} from 'antd'

const getTime=()=>{
    let date=new Date()
    let year=date.getFullYear()
    let month=date.getMonth()+1
    let day=date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()

    month<10?month='0'+month:month
    day<10?day='0'+day:day
    hour<10?hour='0'+hour:hour
    minute<10?minute='0'+minute:minute
    second<10?second='0'+second:second

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

// 获取当前显示的标题
const getTitle=()=>{
    const location=useLocation()
    // 获得当前的请求路径
    const path=location.pathname
    let title
    // 两层遍历
    menuData.forEach(item=>{
      if(item.path===path){
        title=item.title
      }else if(item.children){
        const cItem=item.children.find(cItem=>cItem.path===path)
        cItem?title=cItem.title:''
      }
    })
    return title
}

export default function Header(props) {
  // 设置状态存储时间
  const [currentTime, setCurrentTime] = useState('')
  
  useEffect(() => {
    // 组件挂载后立即更新时间
    setCurrentTime(getTime());
    
    // 设置每秒更新一次的定时器
    const timer = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000);
    
    // 清理函数：组件卸载时清除定时器
    return () => clearInterval(timer);
  }, []); 
  
  const title=getTitle()

  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()
  const handleLogout = () => {
    modal.confirm({
      title: '确认',
      content: '您确定要退出系统吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        // 清除登录信息
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        // 跳转到登录页
        navigate('/login')
      },
      onCancel: () => {
        console.log('用户取消退出')
      }
    })
  }

  return (
    <div className={props.Header}>
      {contextHolder}
      <div className={classes.Welcome}>
        <span>欢迎管理员</span>
        <a onClick={handleLogout}>退出</a>
      </div>
      <div className={classes.Time}>
        <div>{title}</div>
        <span>{currentTime}</span>
      </div>
    </div>
  )
}
