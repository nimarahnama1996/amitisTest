import React from 'react'
import { Cascader, Input, Menu } from 'antd';
import { SearchOutlined  } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import {HomeOutlined} from '@ant-design/icons'



import './SideMenu.css'
import menuLogo from '../../img/menuLogo.PNG'
import menuUser from '../../img/user.png'



const options = [
  {
    value: 'نام کاربری',
    label: 'احمد احمدی',
    
  },
];



const SideMenu = () => {



  return (
    <div className='container'>

      <div className='top-menu'>
      <div className='menu-logo'>
        <img src={menuLogo} alt='logo'/>
      </div>

      <div className='menu-user'>
        <img src={menuUser} alt='user'/>
      </div>

      <div className='menu-cascader'>
      <Cascader size="small" options={options} />
      </div>

      <div className='menu-input'>
      <Input size="small" placeholder="جستجو" prefix={<SearchOutlined />} />
      </div>
      </div>

      <div className='side-menu'>
      <Menu
        style={{ 
  
             }}
        mode="inline"
        
      >
        
          <Menu.Item key="1" icon={<HomeOutlined className='home'/>} >
            <Link to='/'>مدیریت کاربران</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<HomeOutlined className='home'/>} >
            <Link to='/'>مدیریت طرح</Link>
          </Menu.Item>

          <Menu.Item key="3" icon={<HomeOutlined className='home'/>} >
            <Link to='/'>مدیریت تیکت</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<HomeOutlined className='home'/>} >
            <Link to='/contract'>مدیریت قرارداد</Link>
          </Menu.Item>

          <Menu.Item key="5" icon={<HomeOutlined className='home'/>} >
            <Link to='/services'>سرویس ها</Link>
          </Menu.Item>

          <Menu.Item key="6" icon={<HomeOutlined className='home'/>} >
            <Link to='/'>مدیریت مالی</Link>
          </Menu.Item>

          <Menu.Item key="7" icon={<HomeOutlined className='home'/>} >
            <Link to='/'>گزارش کارکرد</Link>
          </Menu.Item>

          

          </Menu>
      </div>



    </div>
  )
}

export default SideMenu