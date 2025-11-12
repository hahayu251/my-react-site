import React, { useState, useRef, useMemo } from 'react'
import classes from './index.module.css'

const Category = ({
  // 从外部传入的props
  title = "分类列表",           // 卡片标题
  data = [],                  // 分类数据
  onAdd,                      // 添加分类的回调
  onEdit,                     // 编辑分类的回调  
  onDelete,                   // 删除分类的回调
  maxPageSize = 4,            // 每页显示数量
  addButtonText = '+ 添加',    // 添加按钮文字
  addButtonStyle = {
    width: '60px',
    height: '30px',
    fontSize: '14px',
    color: 'rgb(242, 241, 241)',
    backgroundColor:' #2a7fe0',
    border: 'none',
    borderRadius: '6px'
  },                          // 按钮样式
  modalText='添加新分类',     //弹窗
  // modalTextName='分类名称',
  modalFormTitle={
    fontSize: '22px'
  },
  modalFormInput={
    border: '1px solid rgb(137, 138, 138)',
    borderRadius: '4px',
    width: '250px',
    height: '40px',
  },
  // 表单字段配置
  formFields = [
    { 
      key: 'title', 
      label: '分类名称', 
      type: 'text', 
      unique: true,
      placeholder: '请输入分类名称'
    }
  ],
  // 表格列配置
  columns = [                 
    { key: 'title', label: '名称' , width: '70%'},
    { key: 'actions', label: '操作' , width: '30%'}
  ]
}) => {
  // 状态 - 只管理UI状态，数据状态由父组件管理
  const [isModalOpen, setIsModalOpen] = useState(false)
  const inputRefs = useRef({})
  const [currentPage, setCurrentPage] = useState(1)

  // 计算属性
  const totalPages = Math.ceil(data.length / maxPageSize)
  
  // 当前页的数据
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * maxPageSize
    return data.slice(start, start + maxPageSize)
  }, [currentPage, data, maxPageSize])

  // 页面跳转
  const gotoPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const gotoNext = () => {
    if (currentPage > 0 && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
    // 禁用在下面设置
  }

  // 弹窗相关
  const openAddModal = () => {
    setIsModalOpen(true)
  }
  const handleClose = () => {
    setIsModalOpen(false)
    // 清空所有输入框
    Object.values(inputRefs.current).forEach(ref => {
      if (ref) ref.value = ''
    })
  }

  // 添加分类 - 调用父组件的回调
  const handleAdd = () => {
    const formData = {}
    let hasError = false

    // 收集所有字段数据并验证
    formFields.forEach(field => {
      const value = inputRefs.current[field.key]?.value.trim()
      formData[field.key] = value

      // 验证唯一性
      if (field.unique && data.some(item => item[field.key] === value)) {
        alert(`${field.label}已存在`)
        inputRefs.current[field.key].value = ''
        hasError = true
        return
      }
    })

    if (hasError) return
    
    // 检查父组件是否传入了 onAdd 回调函数
    if (onAdd) {
      onAdd(title, () => {
        handleClose()
      })
    } else {
      handleClose()
    }
  }
  // 删除分类 - 调用父组件的回调
  const handleDelete = (item) => {
    if (onDelete) {
      onDelete(item)
    }
  }
  // 修改分类 - 调用父组件的回调
  const handleEdit = (item) => {
    if (onEdit) {
      onEdit(item)
    }
  }

   // 统一的列渲染函数
  const renderTableCell = (column, item) => {
    // 如果是操作列，使用特殊渲染
    if (column.key === 'actions') {
      return (
        <div className={classes.CategoryCRUD}>
          <span onClick={() => handleEdit(item)}>修改</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span onClick={() => handleDelete(item)}>删除</span>
        </div>
      )
    }
    // 如果有自定义渲染函数，使用它
    // render是需要的时候手动添加的函数
    if (column.render) {
      return column.render(item)
    }
    // 默认渲染：安全地显示数据
    // !!!!!!!!!
    return item[column.key] || '-'
  }

  return (
    <div className={classes.Category}>    
      {/* 头部 */}
        <div className={classes.CategoryHeader}>
          <span>{title}</span>
          <button onClick={openAddModal} style={addButtonStyle}>{addButtonText}</button>
        </div>

      {/* 添加弹窗 */}
      {isModalOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            {/* 头部 */}
            <div className={classes.modalHeader}>
              <h3>{modalText}</h3>
              <button className={classes.closeBtn} onClick={handleClose}>×</button>
            </div>
            {/* 中部 */}
            <div className={classes.modalMiddle}>
               {formFields.map(field => (
                <div key={field.key} className={classes.modalForm}>
                  <span style={modalFormTitle}>
                    {field.label}:
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <input style={modalFormInput}
                    className={classes.modalFormInput}
                    ref={el => inputRefs.current[field.key] = el}
                    placeholder={field.placeholder || `请输入${field.label}`}
                    type={field.type || 'text'}
                  />
                </div>
              ))}
            </div>
            {/* 底部 */}
            <div className={classes.modalFooter}>
              <button className={classes.confirmBtn} onClick={handleAdd}>添加</button>
              <button className={classes.cancelBtn} onClick={handleClose}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* 中部 */}
      <div className={classes.CategoryMiddle}>
        <table className={classes.CategoryTable}>
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.key} style={{ width: column.width }}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.id}>
                {columns.map(column => (
                  <td 
                    key={column.key}
                    style={{ width: column.width }}
                  >
                    {renderTableCell(column, item)}
                  </td>
                ))}
              </tr>
            ))}
            {/* 空数据提示 */}
            {currentData.length === 0 && (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 底部 */}
      { data.length > 0 && (
        <div className={classes.CategoryPage}>
          <button 
            onClick={gotoPrev} 
            className={classes.Prev} 
            disabled={currentPage === 1}
          >
            上一页
          </button>
          
          {/* 立即执行函数 */}
          {(() => {
            const pages = []
            for (let i = 1; i <= totalPages; i++) {
              pages.push(
                <a
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={currentPage === i ? classes.activePage : ''}
                >
                  {i}
                </a>
              )
            }
            return pages
          })()}
          
          <button 
            onClick={gotoNext} 
            className={classes.Next} 
            disabled={currentPage === totalPages}
          >
            下一页
          </button>
        </div>
      )}
    </div>
  )
}

export default Category