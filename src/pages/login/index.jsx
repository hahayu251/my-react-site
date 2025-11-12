import React,{ useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorPicker } from 'antd';
import { AppstoreOutlined,UserOutlined,LockOutlined} from '@ant-design/icons'
import classes from './index.module.css'

// 登录
export default function Login() {
  const submitButtonRef = useRef(null)//使用useref访问DOM元素
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate()

  const handleSubmit=(e)=>{
    // 1.阻止默认行为
    e.preventDefault()
    // 2.判断是否符合标准(用户名不少于11位；密码不少于8位，大写字母开头)
    // 获取值 trim去除空格
    const username=usernameRef.current.value.trim()
    const password=passwordRef.current.value
    // 11位用户名，9位密码且大写开头
    if(username.length>=11&&password.length>=9&&/^[A-Z]/.test(password)){
    // 如果符合就进入下一页面
      submitButtonRef.current.textContent = '登录中...'
      //跳转
      setTimeout(() => {
        // 跳转页面或执行其他操作
        navigate('/admin')
      }, 1000);
      console.log('登录成功，跳转页面');
    }else{
    // 不符合就清空，重新输入
      submitButtonRef.current.textContent = '登录';
      alert('登录失败！用户名需不少于11位，密码需不少于8位且大写字母开头')
      usernameRef.current.value=''
      passwordRef.current.value=''
    }
  }

  const [bgColor, setBgColor] = useState('#589cf0')
  const handleColorChange = (color) => {
    // 将选择器的颜色值转换为十六进制字符串格式，并更新状态
    const hexColor = color.toHexString()
    setBgColor(hexColor)
    // 可选：将颜色保存到本地存储 (localStorage)，页面刷新后颜色不会丢失
    // localStorage.setItem('headerBgColor', hexColor);
  };

  return (
    <div className={classes.login}  style={{ backgroundColor: bgColor}}>
      <header className={classes.loginHeader}>
        <div>
          <AppstoreOutlined className={classes.loginIcon}/>
          <span>后台管理系统</span>
        </div>
        <div className={classes.colorPickerContainer}>
          自定义背景颜色 :&nbsp;&nbsp;
          <ColorPicker value={bgColor} onChange={handleColorChange} className={classes.colorPicker}/>
        </div>
      </header>
      
      <section className={classes.loginForm}>
        <h2>用户登录</h2>  
        {/* 用户名 */}
        <div className={classes.loginUsername} style={{marginTop:'20px'}}>
          <UserOutlined style={{paddingRight:'4px'}}/><span>用户名：</span>
          <input ref={usernameRef} type="text" placeholder='请输入用户名' title="用户名应为4-20位字母或数字"/>
        </div>
        {/* 密码 */}
        <div >
          <LockOutlined style={{paddingRight:'4px'}}/><span>密码：</span>
          <input ref={passwordRef} type="password" placeholder='请输入密码'/>
        </div>
        {/* 按钮
          <div className={classes.loginRemember}>
            <input type="checkbox" />
            <span>记住密码</span>
          <a href='#'>忘记密码？</a> */}
        {/* 登录 */}
        <button className={classes.loginButton} type='submit' ref={submitButtonRef} onClick={handleSubmit}>
          登录
        </button>
      </section>
    </div>
  )
}
