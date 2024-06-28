import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthForm from '../components/AuthForm/AuthForm'
import Home from '../pages/Home'
import ProductDetail from '../pages/ProductDetail'
import AdminPage from '../pages/admins/AdminPage'
import ProductFrom from '../pages/admins/ProductFrom'
import NotFound from './../pages/NotFound'
import PrivateRoutes from './PrivateRoutes'
import LayoutClient from './../components/layouts/LayoutClient';
import LayoutAdmin from './../components/layouts/LayoutAdmin';

const AppRoutes = ({props}) => {
  return (
    <>
    <Routes >
      {/* client */}
      <Route path='/' element={<LayoutClient/>}>
      <Route index element={<Home/>}/>
      <Route path='/product-detail/:id' element={<ProductDetail/>}/>
      </Route> 
      {/* admin */}
      <Route path='/admin' element={<PrivateRoutes/>}>
      <Route path='/admin' element={<LayoutAdmin/>}/>
      <Route index element={<AdminPage/>}/>
      <Route path='/admin/product-form' element={<ProductFrom/>}>
      <Route path='/admin/product-form/edit/:id' element={<ProductFrom/>}/>
      </Route>
      </Route>
      <Route path='/register' element={<AuthForm isRegister/>}/>
      <Route path='/login' element={<AuthForm/>}/>
       <Route path='*' element={<NotFound/>}/>
     </Routes>
    </>
  )
}

export default AppRoutes
