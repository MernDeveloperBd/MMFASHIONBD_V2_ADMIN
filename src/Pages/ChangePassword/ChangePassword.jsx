import { Button, CircularProgress } from '@mui/material';
import { useContext, useState } from 'react';
import { CgLogIn } from 'react-icons/cg';
import { FaEye, FaRegUser } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaEyeSlash } from 'react-icons/fa6';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [confirmShowPassword, setConfirmSetShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { openAlertBox } = useContext(MyContext)
    const navigate = useNavigate()
    const [formFields, setFormFields] = useState({
        email: localStorage.getItem("userEmail"),
        newPassword: '',
        confirmPassword: ''
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    }
    const validValue = Object.values(formFields).every(e1 => e1);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (formFields.newPassword === "") {
            setIsLoading(false)
            openAlertBox('error', "Please enter your New Password")
            return false
        }
        if (formFields.confirmPassword === "") {
            setIsLoading(false)
            openAlertBox('error', "Please enter your confirm New Password")
            return false
        }
        if (formFields.confirmPassword !== formFields.newPassword) {
            setIsLoading(false)
            openAlertBox('error', "Password and confirm New Password not match")
            return false
        }
        postData(`/api/user/reset-password`, formFields).then((res) => {
            if (res?.error === false) {
                localStorage.removeItem("userEmail")
                localStorage.removeItem("actionType")
                setIsLoading(false)
                openAlertBox('success', res?.message)
                navigate('/login')
            }
            else {
                openAlertBox('error', res?.message)
            }
        })

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

            <div className="loginbox card mx-auto w-[500px] h-[auto] pt-20 relative z-50">
                <div className="text-center">
                    <img src="https://i.ibb.co.com/dw4bR2nX/Misam-Marifa-Fashion-World.png" alt="" className='mx-auto w-[40px]' />
                </div>
                <h1 className='text-center text-[35px] font-[800]'>Welcome Back! </h1>
                <h2 className='text-center text-[25px] font-[600]'>You can change your password from here.</h2>

                {/* form */}
                <form className='w-full px-8 mt-3' onSubmit={handleSubmit}>

                    <div className="form-group mb-4 w-full">
                        <h4 className='text-[14px] font-[500] mb-1'>New Password</h4>
                        <div className='relative w-full mb-4'>
                            <input type={showPassword ? "text" : "password"} className='w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                                name='newPassword'
                                value={formFields.newPassword}
                                disabled={isLoading === true ? true : false}
                                onChange={onChangeInput} />

                            <Button onClick={() => setShowPassword(!showPassword)} className='!absolute !top-[4px] !right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-black'>{showPassword ? <FaEyeSlash className='text-[18px]' /> : <FaEye className='text-[18px]' />}</Button>
                        </div>

                        <h4 className='text-[14px] font-[500] mb-1'>Confirm New Password</h4>
                        <div className='relative w-full'>
                            <input type={confirmShowPassword ? "text" : "password"} className='w-full h-[40px] border border-[rgba(0,0,0,0.1)] rounded-md focus:border-[rgba(0,0,0,0.7)] focus:outline-none px-3'
                                name='confirmPassword'
                                value={formFields.confirmPassword}
                                disabled={isLoading === true ? true : false}
                                onChange={onChangeInput} />

                            <Button onClick={() => setConfirmSetShowPassword(!confirmShowPassword)} className='!absolute !top-[4px] !right-[10px] z-50 !rounded-full !w-[35px] !h-[35px] !min-w-[35px] !text-black'>{confirmShowPassword ? <FaEyeSlash className='text-[18px]' /> : <FaEye className='text-[18px]' />}</Button>
                        </div>

                    </div>
                    <Button type='submit' disabled={!validValue} className={`${!validValue ? '!bg-gray-800 cursor-not-allowed' : '!bg-primary hover:!bg-sky-600'
                                } !text-white !w-full flex gap-3`}>
                        {
                            isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : 'Change password'
                        }

                    </Button>
                </form>
            </div>
        </section >
    );
};

export default ChangePassword;