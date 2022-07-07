import React from 'react'
import {MenuOutlined, BellOutlined } from '@ant-design/icons'
import { Cascader } from 'antd';


import user from '../../img/user.png'
import './Navbar.css'


const options = [
    {
      value: 'نام کاربری',
      label: 'احمد احمدی',
      
    },
  ];



const Navbar = () => {
  return (
    <nav className='nav-center'>
        <div className='nav-items'>
        <Cascader size="small" className='nav-cascader' options={options} />
        <img src={user} className='nav-user' alt='user' />
        <BellOutlined className='nav-bell' style={{color:'white'}}/>
        <MenuOutlined className='nav-menu' style={{marginRight:'15px',marginTop:'16px',color:'white',fontSize:'18px' }} />
        </div>


        
 
        
    </nav>
  )
}

export default Navbar