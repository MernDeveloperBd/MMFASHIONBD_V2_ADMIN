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
import { postData } from '../../utils/api';
import { MyContext } from '../../App.jsx';

const Signup = () => {
    const { openAlertBox } = useContext(MyContext);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formFields, setFormFields] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validValue = Object.values(formFields).every(e1 => e1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!formFields.name || !formFields.email || !formFields.password) {
            openAlertBox('error', "Please fill in all fields");
            setIsLoading(false);
            return;
        }
        postData("/api/user/register", formFields)
            .then((res) => {
                if (res?.error !== true) {
                    openAlertBox("success", res?.message);
                    localStorage.setItem("userEmail", formFields.email);
                    setFormFields({ name: "", email: "", password: "" });
                    navigate('/verify-account');
                } else {
                    openAlertBox("error", res?.message);
                }
                setIsLoading(false);
            });
    };

    function handleClickGoogle() {
        setLoadingGoogle(true);
        // Add your Google Auth logic here
    }

    return (
        <section className='bg-[#f1f1f1] w-full min-h-screen relative'>
            {/* Background Image */}
            <img src="/public/shop.webp" alt="" className='w-full h-full fixed top-0 left-0 object-cover opacity-5 pointer-events-none z-0' />

            {/* Header/Navbar */}
            <header className='w-full fixed top-0 left-0 px-4 py-3 flex items-center justify-between z-50 bg-gray-300'>
                <Link to='/'><img src="https://i.ibb.co.com/dw4bR2nX/Misam-Marifa-Fashion-World.png" alt="Logo" className='w-[40px]' /></Link>
                <div className='flex items-center gap-2'>
                    <Button
                        component={NavLink}
                        to="/login"
                        className='!rounded-full !text-[rgba(0,0,0,0.8)] !font-[600] flex gap-2'
                    >
                        <CgLogIn className='!text-[12px] md:text-[18px]' /> Login
                    </Button>
                    <Button
                        component={NavLink}
                        to="/signup"
                        className='!rounded-full !text-[rgba(0,0,0,0.8)] !font-[600] flex gap-2'
                    >
                        <FaRegUser className='!text-[12px] md:text-[18px]' /> Sign Up
                    </Button>
                </div>
            </header>

            {/* Signup Form */}
            <div className="loginbox card mx-auto w-full max-w-[600px] pt-20 md:pt-28 pb-10 px-4 relative z-20">
                <div className="text-center mb-5 space-y-2">
                    <img src="https://i.ibb.co.com/dw4bR2nX/Misam-Marifa-Fashion-World.png" alt="Logo" className='mx-auto w-[40px]' />
                    <h1 className='text-center text-[22px] md:text-[35px] font-[800]'>Join Us Today!</h1>
                    <h2 className='text-center text-[14px] md:text-[25px] font-[600]'>Get Special benefits and Stay up-to-date</h2>
                </div>

                {/* Google Signin */}
                <div className="flex items-center justify-center w-full my-5">
                    <Button
                        size="small"
                        className='!bg-none !font-[600] !text-[11px] md:!text-[14px] !px-5 !text-[rgba(0,0,0,0.8)]'
                        onClick={handleClickGoogle}
                        endIcon={<FcGoogle className='!text-[20px]' />}
                        loading={loadingGoogle}
                        loadingPosition="end"
                        variant="outlined"
                    >
                        Sign in with Google
                    </Button>
                </div>

                <Divider>Or Sign up with your email</Divider>

                <form className='md:w-[80%] mx-auto px-2 sm:px-6 mt-5' onSubmit={handleSubmit}>
                    <div className="form-group mb-3 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Full Name</h4>
                        <input
                            type="text"
                            name="name"
                            value={formFields.name}
                            onChange={onChangeInput}
                            disabled={isLoading}
                            className='w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                        />
                    </div>
                    <div className="form-group mb-3 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Email</h4>
                        <input
                            type="email"
                            name="email"
                            value={formFields.email}
                            onChange={onChangeInput}
                            disabled={isLoading}
                            className='w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                        />
                    </div>
                    <div className="form-group mb-3 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>Password</h4>
                        <div className='relative w-full'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formFields.password}
                                onChange={onChangeInput}
                                disabled={isLoading}
                                className='w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                            />
                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                                className='!absolute !top-[4px] !right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-black'
                            >
                                {showPassword ? <FaEyeSlash className='text-[18px]' /> : <FaEye className='text-[18px]' />}
                            </Button>
                        </div>
                    </div>

                    <div className="form-group mb-4 w-full flex items-center justify-between">
                        <FormControlLabel
                            control={<Checkbox />}
                            label="Remember Me"
                            className='text-[13px]'
                        />
                    </div>

                  <div className=''>
                      <Button
                        type='submit'
                        disabled={!validValue}
                        className={`${!validValue ? '!bg-gray-800 cursor-not-allowed' : '!bg-primary hover:!bg-sky-600'} !text-white !w-full flex gap-3`}
                    >
                        {isLoading ? <CircularProgress className='reg_loading' color="inherit" size={20} /> : 'Sign Up'}
                    </Button>
                  </div>
                </form>
            </div>
        </section>
    );
};

export default Signup;
