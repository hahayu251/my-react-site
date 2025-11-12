import React , { useState } from 'react'
import Category from '../../components/common'

export default function UsersCategory() {

  const usersData=[
    {
      id:'1',
      title:'张三',
      number:1111,
      mail:12335
    },
    {
      id:'2',
      title:'李四',
      number:2222,
      mail:23423
    },
    {
      id:'3',
      title:'王五',
      number:3333,
      mail:35665
    },
    {
      id:'4',
      title:'一一',
      number:4444,
      mail:24543
    },
    {
      id:'5',
      title:'二二',
      number:5555,
      mail:19835
    },
    {
      id:'6',
      title:'三三',
      number:6666,
      mail:10922
    },
    {
      id:'7',
      title:'四四',
      number:7777,
      mail:99631
    },
    {
      id:'8',
      title:'五五',
      number:8888,
      mail:98362
    },
    {
      id:'9',
      title:'六六',
      number:9999,
      mail:38882
    }
  ]
  // 变量提升
  const [users, setUsers] = useState(usersData)

  const handleAdd = (title) => {
    // 生成新ID
    const newId = users.length > 0 ? String(Math.max(...users.map(p => Number(p.id))) + 1) : '1'
    // 创建新品类对象
    const usersToAdd = {
      id: newId,
      title: title,
    }
    // 更新状态
    setUsers(prev => [...prev, usersToAdd])
  }

  // 删除分类的回调函数（真正实现删除功能的）
  const handleDelete = (item) => {
    const isConfirmed = window.confirm(`确定要删除"${item.title}"吗？`)
    if (isConfirmed) {
      setUsers(prev => prev.filter(i => i.id !== item.id))
    }
  }

  // 修改分类的回调函数
  const handleEdit = (item) => {
    const newTitle = window.prompt('请输入新的用户名称', item.title).trim()
    if (newTitle === null) return // 用户点击了取消
    const newNumber = window.prompt('请输入新的电话号码', item.number).trim()
    if (newNumber === null) return
    const newEmail = window.prompt('请输入新的邮箱', item.email).trim()
    if (newEmail === null) return

    // 检查是否为空
    if (!newTitle || !newNumber || !newEmail) {
      alert('用户名称、电话号码和邮箱都不能为空')
      return
    }
    // 检查是否与原来完全相同
    if (newTitle === item.title && 
        newNumber === item.number && 
        newEmail === item.email) {
      alert('修改后的信息与原来相同，无需修改')
      return
    }
    // 检查名称是否已存在
    if (users.some(u => u.id !== item.id && u.title === newTitle.trim())) {
      alert('该品类名称已存在')
      return
    }
      // 更新品类
      setUsers(prev => 
        prev.map(u => u.id === item.id ? { ...u, title: newTitle,number:newNumber,email:newEmail } : u)
      )
      alert('修改成功！')
    }

  return (
    <div>
      <Category 
        title="用户列表"
        data={users}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        maxPageSize={4}
        addButtonText="+ 创建新用户"
        addButtonStyle = {{
          width: '120px',
          height: '30px',
          fontSize: '14px',
          color: 'rgb(242, 241, 241)',
          backgroundColor:' #2a7fe0',
          border: 'none',
          borderRadius: '6px'
        }}
        modalText='添加新用户'
        // modalTextName='用户名称'
        modalFormTitle={{
          fontSize: '14px'
        }}
        modalFormInput={{
          border: '1px solid rgb(137, 138, 138)',
          borderRadius: '4px',
          width: '250px',
          height: '28px',
        }}
        formFields = {[
          { 
            key: 'title', 
            label: '用户姓名', 
            type: 'text', 
            unique: true,
            placeholder: '请输入用户姓名'
          },
          { 
            key: 'phone', 
            label: '电话号码', 
            type: 'tel', 
            unique: true,
            placeholder: '请输入电话号码'
          },
          { 
            key: 'email', 
            label: '邮箱地址', 
            type: 'email', 
            unique: true,
            placeholder: '请输入邮箱地址'
          }
        ]}
        columns = {[                
          { key: 'title', label: '用户名称', width: '34%' },
          { key: 'number', label: '电话号码', width: '22%' },
          { key: 'mail', label: '邮箱', width: '22%' },
          { key: 'actions', label: '操作' , width: '22%'}
        ]}
      />
    </div>
  )
}
