import React from 'react'
import Category from '../../components/common'
import useLocalStorage from '../../hooks/useLocalStorage'

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
  // 使用自定义hook，一行搞定
  const [products, setProducts] = useLocalStorage('products_data', productsData)
 
  // 添加分类的回调函数
  const handleAdd = (formData, closeModal) => {
    // 生成新ID
    const newId = products.length > 0 ? String(Math.max(...products.map(p => Number(p.id))) + 1) : '1'
    // 创建新品类对象
    const productsToAdd = {
      id: newId,
      title: formData.title,
      price:formData.price
    }
    // 更新状态
    setProducts(prev => [...prev, productsToAdd])
    // 关闭弹窗
    if (closeModal) {
      closeModal()
    }
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
      // 第二步：询问新的价格
      const newPrice = window.prompt('请输入新的品类名称', item.price);
      // 如果用户点击取消，直接返回
      if (newPrice === null) return; // 用户点击了取消
      
      const trimmedPrice = newPrice.trim();
      if (trimmedPrice === '') {
        alert('价格不能为空');
        return;
      }
      
      // 验证价格是否为有效数字
      if (isNaN(parseFloat(trimmedPrice))) {
        alert('请输入有效的数字价格');
        return;
      }
      
      // 验证价格是否为正数
      if (newPrice < 0) {
        alert('价格不能为负数');
        return;
      }
      
      // 检查是否与原来完全相同
      if (newTitle === item.title && newPrice === item.price) {
        alert('修改后的信息与原来相同，无需修改');
        return;
      }
      // 更新品类
      setProducts(prev => 
        prev.map(p => p.id === item.id ? { ...p, title: newTitle.trim(),price: newPrice } : p)
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
        modalFormTitle={{
          fontSize: '16px'
        }}
        modalFormInput={{
          border: '1px solid rgb(137, 138, 138)',
          borderRadius: '4px',
          width: '250px',
          height: '30px',
        }}
        formFields = {[
          { 
            key: 'title', 
            label: '商品名称', 
            type: 'text', 
            unique: true,
            placeholder: '请输入商品名称'
          },
          { 
            key: 'price', 
            label: '商品价格', 
            type: 'text', 
            unique: true,
            placeholder: '请输入商品价格'
          }
        ]}
         columns = {[                
            { key: 'title', label: '商品名称' , width: '40%'},
            { key: 'price', label: '商品价格' , width: '30%'},
            { key: 'actions', label: '操作' , width: '30%'}
        ]}
      />     
    </div>
  )
}
