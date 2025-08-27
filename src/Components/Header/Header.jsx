import Button from '@mui/material/Button';
import { AiOutlineMenuFold } from "react-icons/ai";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import Divider from '@mui/material/Divider';
import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MyContext } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import { IoCloseSharp } from "react-icons/io5";
import Slide from '@mui/material/Slide';
import AddProduct from '../../Pages/Products/AddProduct';
import AddCategory from '../../Pages/Category/addCategory';
import EditCategory from '../../Pages/Category/EditCategory';
import AddSubCategory from '../../Pages/subCategory/AddSubCategory';
import AddAddress from '../../Pages/Address/AddAddress';
import EditProduct from '../../Pages/Products/EditProduct';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: '0 4px',
    },
}));
const Transition = (function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const Header = () => {
    const { isSideBarOpen, setIsSideBarOpen,isLogin, setIsLogin, userData, isOpenFullScreenPanel, setIsOpenFullScreenPanel } = useContext(MyContext)
    const [anchorMyAccount, setAnchorMyAccount] = useState(null);
    const open = Boolean(anchorMyAccount);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorMyAccount(event.currentTarget);
    };
    
    const handleCloseMyAcc = () => {
        setAnchorMyAccount(null);
    };
     const logout = () => {
        setAnchorMyAccount(null);
        fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem("accessToken")}`, { withCredentials: true }).then((res) => {
            if (res?.error === false) {
                setIsLogin(false)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("actionType")
                navigate('/')
            }

        })
    }
    return (
        <>
        <header className={`w-full h-[auto] py-2 ${isSideBarOpen === true ? 'pl-60' : 'pl-5'} shadow-md bg-[#fff] border-b border-b-[rgba(0,0,0,0.2)] pr-7 flex items-center justify-between transition-all`}>
            <div className="part1">
                <Button className='!w-[40px] !h-[40px] !min-w-[40px] !text-black !rounded-full' onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    {
                        isSideBarOpen === true ? <AiOutlineMenuFold className='text-[22px] text-green-600' /> :
                            <AiOutlineMenuUnfold className='text-[22px] text-violet-800 z-50' />
                    }
                </Button>
            </div>
            {/* part2 */}
            <div className="part2 w-[40%] flex items-center justify-end gap-3">
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                        <FaRegBell />
                    </StyledBadge>
                </IconButton>
                {/*  */}
                {
                        isLogin === true ? <div className="relative">
                    <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer" onClick={handleClick}>
                        <img src="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740" alt="admin image" className='w-full h-full object-cover rounded-full' />
                    </div>
             
                    {/* down menu */}
                    <Menu
                        anchorEl={anchorMyAccount} // এটা ঠিক করে নিতে ভুলবেন না, নিচে ব্যাখ্যা দিলাম
                        id="account-menu"
                        open={open}
                        onClose={handleCloseMyAcc}
                        onClick={handleCloseMyAcc}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translate(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    >
                        <MenuItem onClick={handleCloseMyAcc} className='!bg-white'>
                            <div className='flex items-center gap-3'>
                                <div className="rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer">
                                    <img src="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740" alt="admin image" className='w-full h-full object-cover rounded-full' />
                                </div>
                                {/* info */}
                                <div className="info">
                                    <h3 className='text-[16px] font-semibold leading-5'>{userData?.name}</h3>
                                    <p className='text-[12px] font-[400] opacity-70'>{userData?.email}</p>
                                </div>
                            </div>
                        </MenuItem>
                        <Divider />
                        <Link to='/profile'>
                        <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-2'>
                            <FaRegUser /><span className='text-[14px]'>Profile</span>
                        </MenuItem>
                        </Link>
                        
                        <MenuItem onClick={handleCloseMyAcc} className='flex items-center gap-2'>
                            <IoSettingsOutline /><span className='text-[14px]'>Account Setting</span>
                        </MenuItem>

                        <Divider />
                        <MenuItem onClick={logout} className='flex items-center gap-2'>
                            <MdLogout /><span className='text-[14px]'>Sign out</span>
                        </MenuItem>

                    </Menu>
                </div>:
                <Link to='/login'><Button className='btn-blue btn-sm !rounded-full '>Sign in</Button></Link>
                }
                
            </div>
        </header>
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
          {isOpenFullScreenPanel?.model === 'Edit Product' && <EditProduct/>}
          {isOpenFullScreenPanel?.model === 'Add Home Slide' && <AddHomeSlide />}
          {isOpenFullScreenPanel?.model === 'Add Category' && <AddCategory />}
          {isOpenFullScreenPanel?.model === 'Edit Category' && <EditCategory />}
          {isOpenFullScreenPanel?.model === 'Add Sub Category' && <AddSubCategory />}
          {isOpenFullScreenPanel?.model === 'Add New Address' && <AddAddress />}
        </Dialog>
        </>
    );
};

export default Header;