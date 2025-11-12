import React,{useState} from 'react'
import Category from '../../components/common'

export default function CharacterCategory() {
  const characterData=[
    {
      id:'1',
      title:'1号',
    },
    {
      id:'2',
      title:'2号',
    },
    {
      id:'3',
      title:'3号',
    }
  ]
  // 变量提升
  const [characters, setCharacters] = useState(characterData)

  const handleAdd = (title) => {
    // 生成新ID
    const newId = characters.length > 0 ? String(Math.max(...characters.map(p => Number(p.id))) + 1) : '1'
    // 创建新品类对象
    const charactersToAdd = {
      id: newId,
      title: title,
    }
    // 更新状态
    setCharacters(prev => [...prev, charactersToAdd])
  }

  // 删除分类的回调函数
  const handleDelete = (item) => {
    const isConfirmed = window.confirm(`确定要删除"${item.title}"吗？`);
    if (isConfirmed) {
      setCharacters(prev => prev.filter(i => i.id !== item.id))
    }
  }

  // 修改分类的回调函数
  const handleEdit = (item) => {
    const newTitle = window.prompt('请输入新的管理员名称', item.title);
    if (newTitle !== null) { // 用户点击了确定，而不是取消
      if (newTitle.trim() === '') {
        alert('管理员名称不能为空')
        return
      }
      // 检查名称是否已存在（排除当前管理员）
      if (characters.some(p => p.id !== item.id && p.title === newTitle.trim())) {
        alert('该管理员已存在')
        return
      }
      // 更新管理员
      setCharacters(prev => 
        prev.map(p => p.id === item.id ? { ...p, title: newTitle.trim() } : p)
      )
    }
  }

  return (
    <div>
      <Category 
        title="管理员列表"
        data={characters}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        maxPageSize={4}
        addButtonText="+ 添加"
        modalText='添加新管理员'
        formFields = {[
          { 
            key: 'title', 
            label: '管理员名称', 
            type: 'text', 
            unique: true,
            placeholder: '请输入管理员名称'
          }
        ]}
         columns = {[                
            { key: 'title', label: '管理员名称' , width: '70%'},
            { key: 'actions', label: '操作' , width: '30%'}
        ]}
      />     
    </div>
  )
}
