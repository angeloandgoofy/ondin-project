import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from './component/navBar';
import Home from './component/home';
import Shop from './component/shop';
import Cart from './component/cart'
import { useState } from "react";
import './App.css';


function Layout({ count, setcount }) {
  return (
    <>
      <Navbar count={count} setcount={setcount} />
      <Outlet context={{ count, setcount }} />
    </>
  );
}

function App() {
  const [count, setcount] = useState(0);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout count={count} setcount={setcount}/>,
      children: [
        { index: true, element: <Home /> },
        { path: 'shop', element: <Shop /> },
        { path: 'cart', element: <Cart /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;