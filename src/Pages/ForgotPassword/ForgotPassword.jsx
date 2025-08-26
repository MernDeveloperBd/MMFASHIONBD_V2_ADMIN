import { Button } from '@mui/material';
import { useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { FaEye, FaRegUser } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, NavLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaEyeSlash } from 'react-icons/fa6';

const ForgotPassword = () => {
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const[showPassword, setShowPassword] = useState(false)
    function handleClickGoogle() {
        setLoadingGoogle(true);
    }

    return (
        <section className='bg-[#f1f1f1] w-full'>
            <header className='w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-10 bg-gray-300'>
                <Link to='/'><img src="https://i.ibb.co.com/dw4bR2nX/Misam-Marifa-Fashion-World.png" alt="" className='w-[40px]' /></Link>
                <div className='flex items-center gap-4'>
                    <NavLink to='/login' exact={true} activeClassName="isActive">
                        <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !font-[600] flex gap-2'><CgLogIn className='text-[18px]' />Login</Button>
                    </NavLink>
                    <NavLink to='/signup' exact={true} activeClassName="isActive">
                    <Button className='!rounded-full !text-[rgba(0,0,0,0.8)] !font-[600] flex gap-2'><FaRegUser className='text-[16px]' />Sign Up</Button>
                    </NavLink>

                </div>
            </header>
            <img src="/public/shop.webp" alt="" className='w-full fixed top-0 left-0 opacity-5 ' />

            <div className="loginbox card mx-auto w-[500px] h-[auto] md:pt-40 relative z-50">
                <div className="text-center">
                    <img src="https://i.ibb.co.com/dw4bR2nX/Misam-Marifa-Fashion-World.png" alt="" className='mx-auto w-[40px]' />
                </div>
                <h1 className='text-center text-[35px] font-[800]'>Having troubel to sing in! </h1>
                <h2 className='text-center text-[25px] font-[600]'>Reset your password</h2>
                {/* form */}
                <form className='w-full px-8 mt-3  flex flex-col justify-center items-center'>
                     <div className="form-group mb-3 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                        <input type="email" className='w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3' placeholder='Enter your Email'/>
                    </div>
               
                    <Button className='btn-blue w-full'>Reset Password</Button>
                    <div className="text-center flex items-center justify-center gap-2 mt-2">
                        <span>Don't want to reset?</span>
                        <Link to='/login' className='text-gray-600 font-[700] hover:underline hover:text-gray-800 '>Sing in</Link>
                    </div>
                </form>
            </div>
        </section >
    );
};

export default ForgotPassword;