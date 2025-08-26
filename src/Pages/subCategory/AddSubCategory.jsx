import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';

const AddSubCategory = () => {
    const { cateData, openAlertBox, setIsOpenFullScreenPanel, getCat } = useContext(MyContext)
    const [productCat, setProductCat] = useState('');
    const [productCat2, setProductCat2] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isLoading2, setIsLoading2] = useState(false)
    const [formFields, setFormFields] = useState({
        name: "",
        parentCatName: null,
        parentId: null
    });
    const [formFields2, setFormFields2] = useState({
        name: "",
        parentCatName: null,
        parentId: null
    });

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.parentId = event.target.value
    };
    const handleChangeProductCat2 = (event) => {
        setProductCat2(event.target.value);
        formFields2.parentId = event.target.value
    };
    const selectCatFun = (catName) => {
        formFields.parentCatName = catName
    }
    const selectCatFun2 = (catName) => {
        formFields2.parentCatName = catName
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        const catId = productCat;
        setProductCat(catId)
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    };

    const onChangeInput2 = (e) => {
        const { name, value } = e.target;
        const catId = productCat2;
        setProductCat2(catId)
        setFormFields2(() => {
            return {
                ...formFields2,
                [name]: value
            }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (formFields.name === "") {
            openAlertBox('error', "Please enter Sub Category Name")
            setIsLoading(false)
            return false;
        }
        if (productCat === "") {
            openAlertBox('error', "Please Select Parent Category")
            setIsLoading(false)
            return false;
        }
        postData("/api/category/createCategory", formFields).then((res) => {
            setTimeout(() => {
                setIsLoading(false)
                setIsOpenFullScreenPanel({ open: false })
            }, 2500)
            getCat()
        })

    }
      const handleSubmit2 = (e) => {
        e.preventDefault()
        setIsLoading2(true)
        if (formFields2.name === "") {
            openAlertBox('error', "Please enter Child Category Name")
            setIsLoading2(false)
            return false;
        }
        if (productCat2 === "") {
            openAlertBox('error', "Please Select Sub Category")
            setIsLoading2(false)
            return false;
        }
        postData("/api/category/createCategory", formFields2).then((res) => {
            setTimeout(() => {
                setIsLoading2(false)
                setIsOpenFullScreenPanel({ open: false })
            }, 2500)
            getCat()
        })

    }




    return (
        <section className='p-5 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* sub category form */}
            <form className='form py-4 border border-violet-400 p-4 rounded' onSubmit={handleSubmit}>
                <h4 className='text-xl font-bold text-violet-800'>Add Sub Category</h4>
                <div className="scroll max-h-[72vh] overflow-y-scroll pt-4 pb-4">
                    {/*  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 mb-4">
                        {/* Category */}
                        <div className="w-full">
                            <h3 className="text-[14px] font-[500] mb-2">Product Category</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productCat}
                                label="Category"
                                onChange={handleChangeProductCat}
                            >
                                {
                                    cateData?.length !== 0 && cateData?.map((item, index) => {
                                        return <MenuItem key={index} value={item?._id} onClick={() => selectCatFun(item?.name)}>{item?.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </div>
                        {/*  */}
                        <div className="w-full ">
                            <h3 className="text-[16px] font-[600] mb-1">Sub Category Name</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='name' onChange={onChangeInput} />
                        </div>

                    </div>

                </div>
                <div className='w-[250px]'>
                    <Button type='submit' className=' btn-blue flex items-center w-full justify-center gap-2 font-[600]'>
                        {
                            isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : <> <FaCloudUploadAlt className='text-[20px] ' />Publish and View</>
                        }
                    </Button>
                </div>
            </form>
            {/* sub category form */}
            <form className='form py-4 border border-green-400 p-4 rounded' onSubmit={handleSubmit2}>
                <h4 className='text-xl font-bold text-green-800'>Add Child Category</h4>
                <div className="scroll max-h-[72vh] overflow-y-scroll pt-4 pb-4">
                    {/*  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 mb-4">
                        {/* Category */}
                        <div className="w-full">
                            <h3 className="text-[14px] font-[600] mb-2">Product Sub Category</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productCat2}
                                label="Category"
                                onChange={handleChangeProductCat2}
                            >
                                {
                                    cateData?.length !== 0 && cateData?.map((item, index) => {
                                       return (
                                         item?.children?.length !== 0 && item?.children?.map((item2, index) =>{
                                                 return (
                                            <MenuItem key={index} value={item2?._id} onClick={() => selectCatFun2(item2?.name)}>{item2?.name}</MenuItem>
                                        )
                                        })
                                       
                                       )
                                    })
                                }
                            </Select>
                        </div>
                        {/*  */}
                        <div className="w-full ">
                            <h3 className="text-[16px] font-[600] mb-1">Child Category Name</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='name' value={formFields2?.name} onChange={onChangeInput2} />
                        </div>

                    </div>

                </div>
                <div className='w-[250px]'>
                    <Button type='submit' className=' btn-green flex items-center w-full justify-center gap-2 font-[600]'>
                        {
                            isLoading2 === true ? <CircularProgress className='reg_loading' color="inherit" /> : <> <FaCloudUploadAlt className='text-[20px] ' />Publish and View</>
                        }
                    </Button>
                </div>
            </form>

        </section>
    );
};

export default AddSubCategory;