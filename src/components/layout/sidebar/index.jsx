import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import MenuItem from './menuItem'
// import SubMenuItem from './subMenuItem'

import { HomeOutlined ,ShoppingOutlined ,UserOutlined ,IdcardOutlined ,LineChartOutlined  } from '@ant-design/icons'
import classes from './index.module.css'

export const menuData=[
      {
          id:1,
          icon:<HomeOutlined />,
          title:'首页',
          path:'/admin/home'
      },
      {   
          id:2,
          icon:<ShoppingOutlined />,
          title:'商品',
          path:'/admin/goods',
          children:[
              {
                  id:3,
                  title:'品类管理',
                  path:'/admin/category'
              },
              {
                  id:4,
                  title:'商品管理',
                  path:'/admin/product'
              }
          ]
      },
      {   
          id:5,
          icon:<UserOutlined />,
          title:'用户管理',
          path:'/admin/users'
      },
      {   
          id:6,
          icon:<IdcardOutlined />,
          title:'管理员管理',
          path:'/admin/character'
      },
      {   
          id:7,
          icon:<LineChartOutlined />,
          title:'图形图表',
          path:'/admin/chart'
      }
  ]

export default function Sidebar(props) {
  // 定义子菜单展开状态
  const [isSubMenuItemExpanded,setIsSubMenuItemExpanded]=useState(false)

  const handleToggleMenu=()=>{
    // 切换功能
     setIsSubMenuItemExpanded(!isSubMenuItemExpanded)
  }

  return (
    <div className={props.Sidebar}>
      <div>
        <header>
          {/* link? */}
          <h1 className={classes.sidebarTitle}>后台管理系统</h1>
        </header>
        <div>
          {
            menuData.map(item=>{
              // 是不是可以写在一块，由menuitem自己区分
              // if(item.children){
              //   return(
              //     <div>
              //       <MenuItem isSubMenuItemExpanded={isSubMenuItemExpanded} handleToggleMenu={handleToggleMenu} menuData={item} MenuItem={classes.MenuItem}/>
              //     </div>
              //   )
              // }else{
              //   return <MenuItem menuData={item} MenuItem={classes.MenuItem}/>
              // }

              return <MenuItem isSubMenuItemExpanded={isSubMenuItemExpanded} handleToggleMenu={handleToggleMenu} menuData={item} key={item.id}/>
            })
          }
        </div>
      </div>
    </div>
  )
}
