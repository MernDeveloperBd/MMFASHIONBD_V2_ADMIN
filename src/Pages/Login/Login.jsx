import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { FaEye, FaRegUser } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaEyeSlash } from 'react-icons/fa6';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App.jsx';
import { postData } from '../../utils/api';

const Login = () => {
    const { openAlertBox, setIsLogin } = useContext(MyContext)
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    function handleClickGoogle() {
        setLoadingGoogle(true);
        // Your Google login logic here
    }

    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()

    const forgotPassword = () => {
        if (formFields.email === "") {
            openAlertBox('error', "Please enter your email first")
            return false;
        }
        else {
            openAlertBox('success', `OTP Send to ${formFields.email}`)
            localStorage.setItem("userEmail", formFields.email)
            localStorage.setItem("actionType", 'forgot-password')
            //
            postData("/api/user/forgot-password", {
                email: formFields.email,

            }).then((res) => {
                if (res?.error === false) {
                    openAlertBox("success", res?.message)
                    navigate('/verify-account')
                }
                else {
                    openAlertBox("error", res?.message)
                }
            })
        }
    };
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }

    const validValue = Object.values(formFields).every(e1 => e1)
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (formFields.email === "") {
            openAlertBox('error', "Please enter your email")
            return false
        }
        if (formFields.password === "") {
            openAlertBox('error', "Please enter your password")
            return false
        }
        postData("/api/user/login", formFields, { withCredentials: true })
            .then((res) => {
                if (res?.error !== true) {
                    setIsLoading(false);
                    openAlertBox("success", res?.message)
                    
                    setFormFields({
                        email: "",
                        password: ""
                    })
                    localStorage.setItem("accessToken", res?.data?.accessToken);
                    localStorage.setItem("refreshToken", res?.data?.refreshToken);
                    localStorage.removeItem("actionType")
                    setIsLogin(true)
                    navigate('/')
                } else {
                    openAlertBox("error", res?.message)
                    setIsLoading(false)
                }

            })
    }

    return (
        <section className='bg-[#f1f1f1] w-full min-h-screen relative'>
            {/* Background Image */}
            <img src="/public/shop.webp" alt="" className='w-full h-full fixed top-0 left-0 object-cover opacity-5 pointer-events-none z-0' />

            {/* Header/Navbar */}
            <header className='w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50 bg-gray-300'>
                <Link to='/'><img src="https://i.ibb.co.com/dw4bR2nX/Misam-Marifa-Fashion-World.png" alt="Logo" className='w-[40px]' /></Link>
                <div className='flex items-center gap-4'>
                    <Button
                        component={NavLink}
                        to="/login"
                        className='!rounded-full !text-[rgba(0,0,0,0.8)] !font-[600] flex gap-2'
                    >
                        <CgLogIn className='text-[18px]' /> Login
                    </Button>
                    <Button
                        component={NavLink}
                        to="/signup"
                        className='!rounded-full !text-[rgba(0,0,0,0.8)] !font-[600] flex gap-2'
                    >
                        <FaRegUser className='text-[16px]' /> Sign Up
                    </Button>
                </div>
            </header>

            {/* Login Box */}
            <div className="loginbox card mx-auto w-full max-w-[600px] pt-28 pb-10 px-4 relative z-20">
                <div className="text-center mb-5">
                    <img src="https://i.ibb.co.com/dw4bR2nX/Misam-Marifa-Fashion-World.png" alt="Logo" className='mx-auto w-[40px]' />
                    <h1 className='text-center text-[28px] md:text-[35px] font-[800]'>Welcome Back!</h1>
                    <h2 className='text-center text-[18px] md:text-[25px] font-[600]'>Sign in with your credentials.</h2>
                </div>

                {/* Google Signin */}
                <div className="flex items-center justify-center w-full my-5">
                    <Button
                        size="small"
                        className='!bg-none !font-[600] !text-[14px] !px-5 !text-[rgba(0,0,0,0.8)]'
                        onClick={handleClickGoogle}
                        endIcon={<FcGoogle className='!text-[20px]' />}
                        loading={loadingGoogle}
                        loadingPosition="end"
                        variant="outlined"
                    >
                        Sign in with Google
                    </Button>
                </div>

                <Divider>Or Sign in with your email</Divider>

                {/* Form */}
                <form className='w-full px-2 sm:px-6 mt-5' onSubmit={handleSubmit}>
                    <div className="form-group mb-3 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                        <input
                            type="email"
                            className='w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                            id='email'
                            name='email'
                            value={formFields.email}
                            disabled={isLoading === true ? true : false}
                            onChange={onChangeInput}
                        />
                    </div>
                    <div className="form-group mb-1 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
                        <div className='relative w-full'>
                            <input
                                type={showPassword ? "text" : "password"}
                                className='w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                                id='password'
                                name='password'
                                value={formFields.password}
                                disabled={isLoading === true ? true : false}
                                onChange={onChangeInput}
                            />
                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                                className='!absolute !top-[4px] !right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-black'
                            >
                                {showPassword ? <FaEyeSlash className='text-[18px]' /> : <FaEye className='text-[18px]' />}
                            </Button>
                        </div>
                    </div>

                    <div className="form-group mb-2 w-full flex items-center justify-between">
                        <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="Remember Me"
                            className='text-[13px]'
                        />
                        <a onClick={forgotPassword}                           
                            className='text-primary font-[600] text-[13px] hover:underline hover:text-black transition-all duration-300 cursor-pointer'
                        >
                            Forgot Password?
                        </a>
                    </div>

                    <Button type='submit' disabled={!validValue} className={`${!validValue ? '!bg-gray-800 cursor-not-allowed' : '!bg-primary hover:!bg-sky-600'
                        } !text-white !w-full flex gap-3`}>
                        {
                            isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : 'Login'
                        }
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default Login;
