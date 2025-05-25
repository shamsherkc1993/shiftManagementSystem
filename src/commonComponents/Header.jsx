import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../pages/Dashboard';
import Shift from '../pages/Shift';
import AddUser from '../pages/AddUser';
import CreateNewShift from '../pages/CreateNewShift';
import ViewUserDetail from '../pages/ViewUserDetail';


const Header = () => {
  return (
    <>
      <Routes>
         <Route path='/' element={<Dashboard/>}>Dashboard</Route>
        <Route path='/viewshift' element={<Shift />}/>
        <Route path='/createshift' element={<CreateNewShift />}/>
        <Route path='/adduser' element={<AddUser />}/>
        <Route path='/viewuser' element={<ViewUserDetail />}/>
        <Route path='/*' element={<h1>pg not found</h1>}/> 
      </Routes>
    </>
  )
}

export default Header
