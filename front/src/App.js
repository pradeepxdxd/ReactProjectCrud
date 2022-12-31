import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Products from './components/Products'
import Regis from './components/Regis'
import Container from '@mui/material/Container';
import { isAdmin, isLoggedIn } from './services/Myservice'
import Cart from './components/Cart'
import Addproduct from './components/Addproduct'
import { Navigate } from 'react-router-dom'
import UpdatePro from './components/UpdatePro'
import ProductsDetInCart from './components/ProductsDetInCart'
function ProtectRoute({children}){
    const auth=isLoggedIn();
    
    return auth ?children: <Navigate to="/"/>
}
function ProtectAdminRoute({children}){
  const auth=isLoggedIn();
  const adminauth=isAdmin();
  return auth && adminauth ?children: <Navigate to="/"/>
}
export default function App() {
  return (
    <div>
      <Router>
         <Header />
         <Container>
           <Routes>
              <Route path='' element={<Login/>}/>
              <Route path='regis' element={<Regis/>}/>
              <Route path='products' element={
                <ProtectRoute>
                    <Products />
                </ProtectRoute>
              }/>
              <Route path='cart' element={
                <ProtectRoute>
                    <Cart />
                </ProtectRoute>
              }/>
              <Route path='/product-detail-cart/:id' element={
                <ProtectRoute>
                  <ProductsDetInCart/>
                </ProtectRoute>
              } />
              <Route path='/addproduct' element={
                <ProtectAdminRoute>
                   <Addproduct />
                </ProtectAdminRoute>
              }/>
              <Route path='/UpdatePro/:id' element={
                <ProtectAdminRoute>
                  <UpdatePro />
                </ProtectAdminRoute>
              } />
           </Routes>
         </Container>
      </Router>
    </div>
  )
}