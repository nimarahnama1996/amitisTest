import React from 'react'
import { Route, Routes } from 'react-router-dom';



import './App.css';
import Navbar from './components/Navbar/Navbar';
import SideMenu from './components/SideMenu/SideMenu';
import UsersContract from './pages/UsersContract/UsersContract';
import UsersManage from './pages/UsersManagement/UsersManage';
import UsersService from './pages/UsersService/UsersService';



function App() {
  return (
    
    <div>
    
    <div>
      <Navbar/>
    </div>

    

    <div>
      <SideMenu/>
    </div>

    <div>
      <Routes>
        <Route  path='/' element={<UsersManage/>}/>
      </Routes>

      <Routes>
        <Route  path='/services' element={<UsersService/>}/>
      </Routes>

      <Routes>
        <Route  path='/contract' element={<UsersContract/>}/>
      </Routes>

     
    </div>
    </div>
  );
}

export default App;
