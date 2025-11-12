import React from 'react'
import { useNavigate } from 'react-router-dom'
import SubMenuItem from '../subMenuItem'

import classes from './index.module.css'

export default function menuItem(props) {
    const navigate = useNavigate()
    // 析构
    const {handleToggleMenu,isSubMenuItemExpanded}=props
    const {title,icon,children,path}=props.menuData

    // 判断是否有子菜单 
    const hasChildren = children&&children.length>0

    return (
            <div> 
                <div>
                     {/* 主菜单 */}
                    <div  className={classes.MenuItem}
                        onClick={()=>{
                        // 如果有孩子切换状态
                        if(hasChildren){
                            handleToggleMenu()
                        }else{
                        // 如果没有孩子跳转路由
                        // !!!!!!!!!!!!!!!!
                            navigate(path)
                        }}}
                    >
                        <span style={{padding:'0 8px'}}>{icon}</span>
                        <span>{title}</span>
                    
                        {hasChildren ? 
                            <span style={{fontSize:'8px',marginLeft:'66px',marginTop:'2px'}}>
                            {isSubMenuItemExpanded?'▲':'▼'}
                            </span>
                             :''}
                    </div>
                    {/* 子菜单 */}
                    <span>
                        {hasChildren&&isSubMenuItemExpanded&&(
                            children.map((item)=>{
                                return <SubMenuItem children={item} key={item.id}/>
                            }))
                        }
                    </span>
                </div>
            </div>
    )
}
