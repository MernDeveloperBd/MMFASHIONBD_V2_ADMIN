
import { Button, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MyContext } from '../../App';
import {  postData } from '../../utils/api';

const AddAddress = () => {
    const { openAlertBox, setIsOpenFullScreenPanel, userData } = useContext(MyContext)
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(false);
    

    const [formFields, setFormFields] = useState({
        address_line1: '',
        division: '',
        city: '',
        upazila: '',
        state: '',
        postCode: '',
        country: '',
        mobile: '',
        status: '',
        userId:'',
        selected:false
    });
    useEffect(() => {
        setFormFields((prevState) => ({
            ...prevState,
            userId: userData?._id
        }));
    }, [userData]);  


    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
        setFormFields((prevState) => ({
            ...prevState,
            status: event.target.value
        }))
    };


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)

        if (formFields.address_line1 === "") {
            openAlertBox('error', "Please enter your Address line 1")
            return false
        }
        if (formFields.division === "") {
            openAlertBox('error', "Please enter your division")
            return false
        }
        if (formFields.city === "") {
            openAlertBox('error', "Please enter your city")
            return false
        }
        if (formFields.upazila === "") {
            openAlertBox('error', "Please enter your upazila")
            return false
        }
        if (formFields.state === "") {
            openAlertBox('error', "Please enter your state")
            return false
        }
        if (formFields.postCode === "") {
            openAlertBox('error', "Please enter your postCode")
            return false
        }
        if (formFields.country === "") {
            openAlertBox('error', "Please enter your country")
            return false
        }
        if (formFields.mobile === "") {
            openAlertBox('error', "Please enter your 11 digit Mobile Number using country code")
            return false
        }
        console.log(formFields);

        postData(`/api/address/add `, formFields, { withCredentials: true })
            .then((res) => {
                if (res?.error !== true) {
                    setIsLoading(false);
                    openAlertBox("success", res?.data?.message)
                    setIsOpenFullScreenPanel({ open: false })
                } else {
                    openAlertBox("error", res?.data?.message)
                    setIsLoading(false)
                }

            })
    }

    return (
        <section className='p-5 bg-gray-50'>
            <form className='form py-3 p-2' onSubmit={handleSubmit}>
                <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[600] mb-1">Address Line 1</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='address_line1' value={formFields.address_line1} onChange={onChangeInput} />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[600] mb-1">division</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='division' value={formFields.division} onChange={onChangeInput} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mb-3 gap-4">
                          <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[600] mb-1">City</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='city' value={formFields.city} onChange={onChangeInput} />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[600] mb-1">Upazila</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='upazila' value={formFields.upazila} onChange={onChangeInput} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 mb-3 gap-4">
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[600] mb-1">State</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='state' value={formFields.state} onChange={onChangeInput} />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[600] mb-1">Post code</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='postCode' value={formFields.postCode} onChange={onChangeInput} />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[600] mb-1">Country</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='country' value={formFields.country} onChange={onChangeInput} />
                        </div>
                        <div className="col w-[100%]">
                            <h3 className="text-[16px] font-[600] mb-1">Mobile</h3>
                              <div className="flex items-center mb-5">
                                <div className="md:w-[50%] w-full">
                                    <TextField
                                        id="mobile"
                                        label="Mobile Number *"
                                        name='mobile'
                                        defaultValue={formFields.mobile}
                                        disabled={isLoading === true ? true : false}
                                        variant="outlined"
                                        size="small"
                                        className="w-full"
                                        onChange={onChangeInput} />
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className='col w-[100%]'>
                            <h3 className="text-[16px] font-[600] mb-1">Address Line 1</h3>
                            <Select
                                value={status}
                                onChange={handleChangeStatus}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                size='small'
                                className='w-full'
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                    </div>

                </div>
                <hr className='mb-4 ' />
                <Button type='submit' className=' btn-blue flex items-center justify-center gap-2 font-[600]'><FaCloudUploadAlt className='text-[20px]' />Publish and View</Button>
            </form>

        </section>
    );
};

export default AddAddress;