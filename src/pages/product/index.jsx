import React , { useState } from 'react'
import Category from '../../components/common'

export default function ProductCategory() {

  const productsData=[
    {
      id:'1',
      title:'手表',
      price:2599
    },
    {
      id:'2',
      title:'电视',
      price:3099
    },
    {
      id:'3',
      title:'冰箱',
      price:2099
    },
    {
      id:'4',
      title:'洗衣机',
      price:1099
    },
    {
      id:'5',
      title:'电风扇',
      price:499
    },
    {
      id:'6',
      title:'电脑',
      price:8999
    },
    {
      id:'7',
      title:'平板',
      price:3999
    },
    {
      id:'8',
      title:'空调',
      price:1999
    },
    {
      id:'9',
      title:'其他',
      price:99
    }
  ]
  // 变量提升
  const [products, setProducts] = useState(productsData)

  const handleAdd = (title) => {
      
    // 生成新ID
    const newId = products.length > 0 ? String(Math.max(...products.map(p => Number(p.id))) + 1) : '1'
    // 创建新品类对象
    const productsToAdd = {
      id: newId,
      title: title,
    }
    // 更新状态
    setProducts(prev => [...prev, productsToAdd])
  }

  // 删除分类的回调函数
  const handleDelete = (item) => {
    const isConfirmed = window.confirm(`确定要删除"${item.title}"吗？`);
    if (isConfirmed) {
      setProducts(prev => prev.filter(i => i.id !== item.id))
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
      if (products.some(p => p.id !== item.id && p.title === newTitle.trim())) {
        alert('该品类名称已存在')
        return
      }
      // 更新品类
      setProducts(prev => 
        prev.map(p => p.id === item.id ? { ...p, title: newTitle.trim() } : p)
      )
    }
  }

  return (
    <div>
      <Category 
        title="商品列表"
        data={products}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        maxPageSize={4}
        addButtonText="+ 添加"
        modalText='添加新商品'
        // modalTextName='商品名称'
        formFields = {[
          { 
            key: 'title', 
            label: '商品名称', 
            type: 'text', 
            unique: true,
            placeholder: '请输入商品名称'
          }
        ]}
         columns = {[                
            { key: 'title', label: '商品名称' , width: '40%'},
            { key: 'price', label: '商品价格' , width: '30%'},
            { key: 'actions', label: '操作' , width: '30%'}
        ]}
      />     
    </div>
  );
}
