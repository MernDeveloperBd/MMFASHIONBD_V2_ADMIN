import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { FaRegUser } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import OtpInput from './OtpInput';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const VerifyAccount = () => {
    const { openAlertBox } = useContext(MyContext)
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleOtpChange = (value) => {
        setOtp(value)
    };
    const verifyOTP = (e) => {
        e.preventDefault();
        if (otp !== "") {
            setIsLoading(true)
            const actionType = localStorage.getItem('actionType');
            if (actionType !== 'forgot-password') {
                postData("/api/user/verifyEmail", {
                    email: localStorage.getItem("userEmail"),
                    otp: otp
                }).then((res) => {
                    if (res?.error === false) {
                        openAlertBox("success", res?.message)
                        localStorage.removeItem("userEmail")
                        setIsLoading(false)
                        navigate('/login')
                    }
                    else {
                        openAlertBox("error", "Invalid OTP")
                        setIsLoading(false)
                    }
                })
            }
            else {
                postData("/api/user/verify-forgot-password-otp", {
                    email: localStorage.getItem("userEmail"),
                    otp: otp
                }).then((res) => {
                    if (res?.error === false) {
                        openAlertBox("success", res?.message)
                        navigate('/change-password')
                    }
                    else {
                        openAlertBox("error", res?.message)
                        setIsLoading(false)
                    }

                })
            }
        }
        else {
            openAlertBox("error", "Please enter OTP")
        }

    }

    return (
        <section className='bg-[#f1f1f1] w-full h-[100vh]'>
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

            <div className="loginbox card mx-auto w-[600px] h-[auto] pt-20 relative z-50">
                <div className="text-center">
                    <img src="https://i.ibb.co.com/dw4bR2nX/Misam-Marifa-Fashion-World.png" alt="" className='mx-auto w-[40px]' />
                </div>
                <h1 className='text-center text-[35px] font-[800]'>Welcome Back! </h1>
                <h2 className='text-center text-[25px] font-[600]'>Please verify your Email</h2>
                <p className='text-center text-[15px]'>OTP sent to <span className='text-primary font-bold'>{localStorage.getItem("userEmail")}</span></p>

                {/* form */}
                <div className="container mt-4">
                    <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
                        <div className="text-center flex items-center justify-center">
                            <img src="/public/verify.png" alt="" className="w-20" />
                        </div>
                        <h3 className="text-center text-[18px] text-black mt-2 font-bold mb-2">Verify OTP</h3>
                        <p className="text-center mb-3">OTP send to <span className="text-primary font-bold">{localStorage.getItem("userEmail")}</span></p>
                        <form onSubmit={verifyOTP}>
                            <OtpInput length={6} onChange={handleOtpChange} />
                            <div className="flex items-center justify-center mt-4">
                                <Button type="submit" className="w-full !bg-orange-800 !text-white hover:!bg-orange-700 ">
                                    {
                                        isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : 'Verify OTP'
                                    }

                                </Button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </section >
    );
};

export default VerifyAccount;