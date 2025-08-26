import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { editData, fetchDataFromApi, postData, uploadImage } from "../../utils/api";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button, CircularProgress, Radio, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import 'react-international-phone/style.css';
import { Collapse } from "react-collapse";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Profile = () => {
    const [preview, setPriview] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [userId, setUserId] = useState("");
    const [isChangePasswordFormShow, setIsChangePasswordFromShow] = useState(false)
    const navigate = useNavigate();

    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        mobile: '',
    });

    const [changePassword, setChangePassword] = useState({
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(event);
    };

    const { openAlertBox, userData, setIsOpenFullScreenPanel, setAddress, address } = useContext(MyContext);

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token === null) {
            navigate('/login')
        }
    }, [navigate]);

    // address get 
    useEffect(() => {
        if (userData?._id !== "" && userData?._id !== undefined) {
            fetchDataFromApi(`/api/address/get?userId=${userData?._id}`).then((res) => {
                setAddress(res?.data)
            })
            setUserId(userData?._id)
            setFormFields({
                name: userData?.name,
                email: userData?.email,
                mobile: userData?.mobile
            })

            setChangePassword({
                email: userData?.email
            })
        }
    }, [userData, setAddress])


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
        setChangePassword(() => {
            return {
                ...changePassword,
                [name]: value
            }
        })
    };

    useEffect(() => {
        const userAvatar = [];
        if (userData?.avatar !== "" && userData?.avatar !== undefined) {
            userAvatar.push(userData?.avatar);
            setPriview(userAvatar)
        }

    }, [userData?.avatar])
    let img_arr = [];
    let uniqueArray = [];
    let selectedImage = [];
    const formData = new FormData();

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPriview([]);
            const files = e.target.files;
            setUploading(true);

            for (let i = 0; i < files?.length; i++) {
                if (files[i] && (files[i].type === "image/jpeg" || files[i].type === "image/jpg" || files[i].type === "image/png" || files[i].type === "image/webp")
                ) {
                    const file = files[i];
                    selectedImage.push(file);
                    formData.append(`avatar`, file);

                } else {
                    openAlertBox("error", "Please select a valid jpeg or jpg or png or webp file")
                    setUploading(false);
                    return false
                }
            }
            uploadImage("/api/user/user-avatar", formData).then((res) => {
                setUploading(false);
                let avatar = [];
                avatar.push(res?.data?.avatar);
                setPriview(avatar)

            })
        } catch (error) {
            console.log(error);

        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (formFields.name === "") {
            openAlertBox('error', "Please enter your full name")
            return false
        }
        if (formFields.email === "") {
            openAlertBox('error', "Please enter your email Id")
            return false
        }
        if (formFields.mobile === "") {
            openAlertBox('error', "Please enter your Mobile number")
            return false
        }
        editData(`/api/user/${userId}`, formFields, { withCredentials: true })
            .then((res) => {
                if (res?.error !== true) {
                    setIsLoading(false);
                    openAlertBox("success", res?.data?.message)
                } else {
                    openAlertBox("error", res?.data?.message)
                    setIsLoading(false)
                }
            })
    }

    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();
        setIsLoading2(true)

        if (changePassword.oldPassword === "") {
            openAlertBox('error', "Please enter Old Password")
            return false
        }
        if (changePassword.newPassword === "") {
            openAlertBox('error', "Please enter New Password")
            return false
        }
        if (changePassword.confirmPassword === "") {
            openAlertBox('error', "Please enter Confirm Password")
            return false
        }
        if (changePassword.confirmPassword !== changePassword.newPassword) {
            openAlertBox('error', "Password not matche")
            return false
        }
        await postData(`/api/user/reset-password`, changePassword, { withCredentials: true })
            .then((res) => {
                if (res?.error !== true) {
                    setIsLoading2(false);
                    openAlertBox("success", res?.message)
                    navigate('/')
                } else {
                    openAlertBox("error", res?.message)
                    setIsLoading2(false)
                }

            })
    }

    return (
        <>
            <div className="card my-4 py-4 w-[70%] shadow-md sm:rounded-lg bg-white px-5">
                <div className="flex items-center justify-between">
                    <h3 className="text-[20px] font-[700] mb-4">User Profile</h3>
                    <Button className="!ml-auto !bg-red-600 !text-white" onClick={() => setIsChangePasswordFromShow(!isChangePasswordFormShow)}>Change Password</Button>
                </div>
                {/* profile image */}
                <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group flex items-center justify-center bg-gray-200 ">
                    {
                        uploading === true ? <CircularProgress color="inherit" /> : <>
                            {
                                preview?.length !== 0 ? preview?.map((img, index) => {
                                    return (
                                        <img src={img} key={index} className="w-full h-full object-cover" />
                                    )
                                }) : <img src="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740" className="w-full h-full object-cover" />

                            }
                        </>
                    }

                    <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100 duration-300">
                        <FaCloudUploadAlt className="text-[#fff] text-[25px] " />
                        <input type="file" name="avatar" id="" className="absolute top-0 left-0 w-full h-full opacity-0" accept="image/*" onChange={(e) => onChangeFile(e, "/api/user/user-avatar")} />
                    </div>
                </div>

                {/* Form */}
                <form className="form mt-8" onSubmit={handleSubmit}>
                    <div className="flex items-center gap-5 mb-5">
                        <div className="w-[50%]">
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " id="name"
                                label="Full Name *"
                                name='name'
                                value={formFields.name}
                                disabled={isLoading === true ? true : false}
                                onChange={onChangeInput} />

                        </div>
                        <div className="w-[50%]">
                            <input type="email" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " id="email"
                                label="Email *"
                                name='email'
                                value={formFields.email}
                                disabled={isLoading === true ? true : false}
                                onChange={onChangeInput} />

                        </div>

                    </div>
                    <div className="flex items-center mb-5">
                        <div className="md:w-[50%] w-full">
                            <input className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm "
                                id="mobile"
                                label="Mobile Number *"
                                name='mobile'
                                defaultValue={formFields.mobile}
                                disabled={isLoading === true ? true : false}
                                variant="outlined"
                                size="small"
                                onChange={onChangeInput} />

                        </div>
                    </div>

                    {/* Add Address */}
                    <div className="flex items center justify-center p-5 mb-5 rounded-md border border-dashed border-black bg-[#f1faff] hover:bg-[#e5eff5] cursor-pointer" onClick={() => setIsOpenFullScreenPanel({ open: true, model: 'Add New Address' })} >
                        <span className="text-[16px] font-[500]">Add Address</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            address?.length > 0 ? address?.map((address, idx) => {
                                return (

                                    <label key={idx} className="addressBox border border-dashed border-black w-fll flex items-center justify-start bg-[#f1f1f1] p-3 rounded-md">
                                        <Radio {...label} name="address"
                                            checked={selectedValue === (address?._id)}
                                            value={address?._id} onChange={handleChange} />
                                        {
                                            <p>{`${address?.address_line1 + ", " + address?.division + ", " + address?.city + ", " + address?.upazila + ", " + address?.country + ", " + address?.postCode + ", " + address?.state}`}</p>
                                        }
                                    </label>

                                )
                            }) : <div>
                                <p className="text-center text-red-600">No Address here</p>
                            </div>
                        }
                    </div>
                    {/* Add Address end */}


                    <div className="flex items-center gap-4 mt-4">
                        <Button type="submit" className={`cursor-not-allowed btn-blue !text-white '} !text-white  flex gap-3`} >
                            <span className="text-[13px] w-[140px]">Update Profile</span>

                        </Button>
                    </div>
                </form>
            </div>
            {/*  */}
            <Collapse isOpened={isChangePasswordFormShow} >
                <div className="card bg-white mt-4 p-5 shadow-md rounded-md w-[65%]">
                    <div className="flex items-center pb-1">
                        <Button onClick={() => setIsChangePasswordFromShow(!isChangePasswordFormShow)} className="pb-0">Change Password</Button>
                    </div>
                    <hr />
                    <form className="mt-5" onSubmit={handleSubmitChangePassword}>
                        <div className="flex items-center gap-5 mb-5">
                            <div className="w-[50%]">
                                <TextField
                                    id="oldPassword"
                                    label="old password"
                                    name='oldPassword'
                                    size="small"
                                    variant="outlined"
                                    className="w-full"
                                    disabled={isLoading2 === true ? true : false}
                                    value={changePassword.oldPassword}
                                    onChange={onChangeInput} />
                            </div>
                            <div className="w-[50%]">
                                <TextField
                                    type='text'
                                    id="newPassword"
                                    label="New Password"
                                    variant="outlined"
                                    size="small"
                                    className='w-full'
                                    disabled={isLoading2 === true ? true : false}
                                    name='newPassword'
                                    value={changePassword.newPassword}
                                    onChange={onChangeInput} />
                            </div>
                        </div>
                        <div className="flex items-center gap-5 mb-5">
                            <div className="w-[50%]">
                                <TextField
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    variant="outlined"
                                    size="small"
                                    className="w-full"
                                    name='confirmPassword'
                                    disabled={isLoading2 === true ? true : false}
                                    value={changePassword.confirmPassword}
                                    onChange={onChangeInput} />
                            </div>

                        </div>
                        <div className="flex items-center gap-4">
                            <Button type="submit" className={`cursor-not-allowed btn-blue !text-white flex gap-3`} >
                                Change Password
                            </Button>
                        </div>
                    </form>
                </div>
            </Collapse>
        </>
    );
};

export default Profile;