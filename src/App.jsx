
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/DashBoard/Dashboard'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import { createContext, useEffect, useState } from 'react'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Products from './Pages/Products/Products'
import AddProduct from './Pages/Products/AddProduct'
// dialog
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoCloseSharp } from "react-icons/io5";
import Slide from '@mui/material/Slide';
import HomeSliderBanners from './Pages/HomeSliderBanners/HomeSliderBanners'
import AddHomeSlide from './Pages/HomeSliderBanners/AddHomeSlide'
import CategoryList from './Pages/Category/CategoryList'
import AddCategory from './Pages/Category/addCategory'
import SubCategoryList from './Pages/subCategory/SubCategoryList'
import AddSubCategory from './Pages/subCategory/AddSubCategory'
import Users from './Pages/Users/Users'
import Orders from './Pages/Orders/Orders'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import VerifyAccount from './Pages/VerifyAccount/VerifyAccount'
import ChangePassword from './Pages/ChangePassword/ChangePassword'
import toast, { Toaster } from 'react-hot-toast'
import { fetchDataFromApi } from './utils/api'
import Profile from './Pages/Profile/Profile'
import AddAddress from './Pages/Address/AddAddress'
import ChildCategoryList from './Pages/childCategory/ChildCategoryList'
import EditCategory from './Pages/Category/EditCategory'

const Transition = (function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const MyContext = createContext()
function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState([])
  const [cateData, setCateData] = useState([])
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    // model: '',
    id: ''
  });

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <section className='main'>
          <Header />
          <div className="contentMain flex">
            <div className={`overflow-hidden sidebarWrapper ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSideBarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
              <Dashboard />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/products",
      exact: true,
      element: (
        <section className='main'>
          <Header />
          <div className="contentMain flex">
            <div className={`overflow-hidden sidebarWrapper ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSideBarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
              <Products />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/product/upload",
      exact: true,
      element: (
        <section className='main'>
          <Header />
          <div className="contentMain flex">
            <div className={`overflow-hidden sidebarWrapper ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSideBarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
              <AddProduct />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <section className='main'>
          <Header />
          <div className="contentMain flex">
            <div className={`overflow-hidden sidebarWrapper ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSideBarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
              <HomeSliderBanners />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <section className='main'>
          <Header />
          <div className="contentMain flex">
            <div className={`overflow-hidden sidebarWrapper ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSideBarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
              <CategoryList />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/subCategory/list",
      exact: true,
      element: (
        <section className='main'>
          <Header />
          <div className="contentMain flex">
            <div className={`overflow-hidden sidebarWrapper ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSideBarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
              <SubCategoryList />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/users",
      exact: true,
      element: (
        <section className='main'>
          <Header />
          <div className="contentMain flex">
            <div className={`overflow-hidden sidebarWrapper ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSideBarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
              <Users />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <section className='main'>
          <Header />
          <div className="contentMain flex">
            <div className={`overflow-hidden sidebarWrapper ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSideBarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
              <Orders />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <section className='main'>
          <Header />
          <div className="contentMain flex">
            <div className={`overflow-hidden sidebarWrapper ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`contentRight py-4 px-5 ${isSideBarOpen === false ? 'w-[100%]' : 'w-[82%]'} transition-all`}>
              <Profile />
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/login",
      exact: true,
      element: (
        <>
          <Login />
        </>
      )
    },
    {
      path: "/forgot-password",
      exact: true,
      element: (
        <>
          <ForgotPassword />
        </>
      )
    },
    {
      path: "/verify-account",
      exact: true,
      element: (
        <>
          <VerifyAccount />
        </>
      )
    },
    {
      path: "/change-password",
      exact: true,
      element: (
        <>
          <ChangePassword />
        </>
      )
    },
    {
      path: "/signup",
      exact: true,
      element: (
        <>
          <Signup />
        </>
      )
    },
  ]);

  // alert box
  const openAlertBox = (status, msg) => {
    if (status === "success") {
      toast.success(msg)
    }
    if (status === "error") {
      toast.error(msg)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true)
      //`/api/user/user-details?token=${token}`
      fetchDataFromApi(`/api/user/user-details`).then((res) => {
        setUserData(res?.data)
        if (res?.response?.data?.message == 'You have got login') {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          openAlertBox("error", "Your session is closed. please login again")
          window.location.href = '/login'
          // setIsLogin(false)
        }

      })
    } else {
      setIsLogin(false)
    }
  }, [setIsLogin])
  //cat data
  useEffect(() => {
    getCat()
  }, [isOpenFullScreenPanel, setCateData])

  const getCat = () =>{
    fetchDataFromApi('/api/category')
      .then((res) => {
        setCateData(res?.data)
      })
  }

  const values = { isSideBarOpen, userData, setIsSideBarOpen, isLogin, setIsLogin, isOpenFullScreenPanel, setIsOpenFullScreenPanel, openAlertBox, address, setAddress, cateData, setCateData , getCat}

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
        {/* dialog */}
        <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() => setIsOpenFullScreenPanel({ open: false })}
          slots={{
            transition: Transition,
          }}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setIsOpenFullScreenPanel({ open: false })}
                aria-label="close"
              >
                <IoCloseSharp />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {isOpenFullScreenPanel?.model}
              </Typography>
            </Toolbar>
          </AppBar>
          {isOpenFullScreenPanel?.model === 'Add Product' && <AddProduct />}
          {isOpenFullScreenPanel?.model === 'Add Home Slide' && <AddHomeSlide />}
          {isOpenFullScreenPanel?.model === 'Add Category' && <AddCategory />}
          {isOpenFullScreenPanel?.model === 'Edit Category' && <EditCategory />}
          {isOpenFullScreenPanel?.model === 'Add Sub Category' && <AddSubCategory />}
          {isOpenFullScreenPanel?.model === 'Add New Address' && <AddAddress />}
        </Dialog>
        <Toaster />
      </MyContext.Provider>

    </>
  )
}

export default App
