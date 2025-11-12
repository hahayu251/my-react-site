import React , { useState } from 'react'
import Category from '../../components/common'

export default function GoodsCategory() {

  const goodsData=[
    {
      id:'1',
      title:'电器'
    },
    {
      id:'2',
      title:'食品',
    },
    {
      id:'3',
      title:'衣服',
    },
    {
      id:'4',
      title:'电子设备',
    },
    {
      id:'5',
      title:'饰品',
    },
    {
      id:'6',
      title:'果蔬',
    },
    {
      id:'7',
      title:'生鲜',
    },
    {
      id:'8',
      title:'工具',
    },
    {
      id:'9',
      title:'生活用品',
    }
  ]
  // 变量提升
  const [goods, setGoods] = useState(goodsData)

  const handleAdd = (title) => {   
    // 生成新ID
    const newId = goods.length > 0 ? String(Math.max(...goods.map(p => Number(p.id))) + 1) : '1'
    // 创建新品类对象
    const goodsToAdd = {
      id: newId,
      title: title,
    }
    // 更新状态
    setGoods(prev => [...prev, goodsToAdd])
  }

  // 删除分类的回调函数
  const handleDelete = (item) => {
    const isConfirmed = window.confirm(`确定要删除"${item.title}"吗？`);
    if (isConfirmed) {
      setGoods(prev => prev.filter(i => i.id !== item.id))
    }
  }

  // 修改分类的回调函数
  const handleEdit = (item) => {
    const newTitle = window.prompt('请输入新的品类名称', item.title);
    if (newTitle !== null) { // 用户点击了确定，而不是取消
      if (newTitle.trim() === '') {
        alert('品类名称不能为空')
        return
      }
      // 检查名称是否已存在（排除当前品类）
      if (goods.some(g => g.id !== item.id && g.title === newTitle.trim())) {
        alert('该品类名称已存在')
        return
      }
      // 更新品类
      setGoods(prev => 
        prev.map(g => g.id === item.id ? { ...g, title: newTitle.trim() } : g)
      )
    }
  }

  return (
    <div>

      <Category 
        title="分类列表"
        data={goods}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        maxPageSize={4}
        addButtonText="+ 添加"
        columns = {[                
            { key: 'title', label: '品类名称' , width: '70%'},
            { key: 'actions', label: '操作' , width: '30%' }
        ]}
      />
    </div>
  );
}
