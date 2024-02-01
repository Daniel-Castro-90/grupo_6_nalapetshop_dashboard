import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ContentWrapper from './components/ContentWrapper.jsx';
import LasProductInDb from './components/LastProductInDb.jsx';
import Users from './components/Users.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import UserAdded from './components/UserAdded.jsx';
import ProductAdded from './components/ProductAdded.jsx';
import Products from './components/Products.jsx';
import ModifUser from './components/ModifUser.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <ContentWrapper/>
      },
      {
        path:'/last-product',
        element: <LasProductInDb/>
      },
      {
        path: '/products',
        element: <Products/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/adminpanel',
        element: <AdminPanel/>
      },
      {
        path: '/useradded',
        element: <UserAdded/>
      },
      {
        path: '/productadded',
        element: <ProductAdded/>
      },
      {
        path: '/modifuser',
        element: <ModifUser/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
