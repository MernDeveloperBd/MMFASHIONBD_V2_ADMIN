import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AddSubCategory = () => {
    const { cateData, openAlertBox, setIsOpenFullScreenPanel, getCat } = useContext(MyContext)

    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');

    const [filteredSubCats, setFilteredSubCats] = useState([]);
    const [filteredChildCats, setFilteredChildCats] = useState([]);

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

    const navigate = useNavigate()

    // Handle main Category select
    const handleChangeProductCat = (event) => {
        const selectedId = event.target.value;
        setProductCat(selectedId);
        setFormFields({ ...formFields, parentId: selectedId });

        const selectedCat = cateData.find(cat => cat._id === selectedId);
        if (selectedCat) {
            setFilteredSubCats(selectedCat.children || []);
        } else {
            setFilteredSubCats([]);
        }

        // reset child
        setProductSubCat('');
        setFilteredChildCats([]);
    };

    const selectCatFun = (catName) => {
        setFormFields({ ...formFields, parentCatName: catName });
    }

    // Handle subCategory select (for child form)
    const handleChangeProductSubCat = (event) => {
        const selectedId = event.target.value;
        setProductSubCat(selectedId);
        setFormFields2({ ...formFields2, parentId: selectedId });

        const selectedSubCat = filteredSubCats.find(sub => sub._id === selectedId);
        if (selectedSubCat) {
            setFilteredChildCats(selectedSubCat.children || []);
        } else {
            setFilteredChildCats([]);
        }
    };

    const selectSubCatFun = (catName) => {
        setFormFields2({ ...formFields2, parentCatName: catName });
    }

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const onChangeInput2 = (e) => {
        const { name, value } = e.target;
        setFormFields2({
            ...formFields2,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (formFields.name === "") {
            openAlertBox('error', "Please enter Sub Category Name")
            setIsLoading(false)
            return
        }
        if (productCat === "") {
            openAlertBox('error', "Please Select Parent Category")
            setIsLoading(false)
            return
        }
        postData("/api/category/createCategory", formFields).then((res) => {
            console.log(res);
            setTimeout(() => {
                setIsLoading(false)
                setIsOpenFullScreenPanel({ open: false })
                getCat()
                navigate('/subCategory/list')
            }, 2000)
        })
    }

    const handleSubmit2 = (e) => {
        e.preventDefault()
        setIsLoading2(true)
        if (formFields2.name === "") {
            openAlertBox('error', "Please enter Child Category Name")
            setIsLoading2(false)
            return
        }
        if (productSubCat === "") {
            openAlertBox('error', "Please Select Sub Category")
            setIsLoading2(false)
            return
        }
        postData("/api/category/createCategory", formFields2).then((res) => {
            console.log(res);
            setTimeout(() => {
                setIsLoading2(false)
                setIsOpenFullScreenPanel({ open: false })
                getCat()
                navigate('/subCategory/list')
            }, 2000)
        })
    }

    return (
        <section className='p-5 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Add SubCategory form */}
            <form className='form py-4 border border-violet-400 p-4 rounded' onSubmit={handleSubmit}>
                <h4 className='text-xl font-bold text-violet-800'>Add Sub Category</h4>
                <div className="scroll max-h-[72vh] overflow-y-scroll pt-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 mb-4">
                        {/* Category */}
                        <div className="w-full">
                            <h3 className="text-[14px] font-[500] mb-2">Product Category</h3>
                            <Select
                                size='small'
                                className='w-full'
                                value={productCat}
                                onChange={handleChangeProductCat}
                            >
                                {
                                    cateData?.length !== 0 && cateData?.map((item, index) => (
                                        <MenuItem key={index} value={item?._id} onClick={() => selectCatFun(item?.name)}>
                                            {item?.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className="w-full ">
                            <h3 className="text-[16px] font-[600] mb-1">Sub Category Name</h3>
                            <input
                                type="text"
                                className="w-full h-[40px] border p-3 rounded-sm text-sm "
                                name='name'
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-[250px]'>
                    <Button type='submit' className=' btn-blue flex items-center w-full justify-center gap-2 font-[600]'>
                        {isLoading ? <CircularProgress size={20} /> : <><FaCloudUploadAlt /> Publish and View</>}
                    </Button>
                </div>
            </form>

            {/* Add Child Category form */}
            <form className='form py-4 border border-green-400 p-4 rounded' onSubmit={handleSubmit2}>
                <h4 className='text-xl font-bold text-green-800'>Add Child Category</h4>
                <div className="scroll max-h-[72vh] overflow-y-scroll pt-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 mb-4">
                        {/* SubCategory */}
                        <div className="w-full">
                            <h3 className="text-[14px] font-[600] mb-2">Product Sub Category</h3>
                            <Select
                                size='small'
                                className='w-full'
                                value={productSubCat}
                                onChange={handleChangeProductSubCat}
                            >
                                {
                                    filteredSubCats?.length !== 0 && filteredSubCats?.map((item2, index) => (
                                        <MenuItem key={index} value={item2?._id} onClick={() => selectSubCatFun(item2?.name)}>
                                            {item2?.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                        <div className="w-full ">
                            <h3 className="text-[16px] font-[600] mb-1">Child Category Name</h3>
                            <input
                                type="text"
                                className="w-full h-[40px] border p-3 rounded-sm text-sm "
                                name='name'
                                value={formFields2?.name}
                                onChange={onChangeInput2}
                            />
                        </div>
                    </div>
                </div>
                <div className='w-[250px]'>
                    <Button type='submit' className=' btn-green flex items-center w-full justify-center gap-2 font-[600]'>
                        {isLoading2 ? <CircularProgress size={20} /> : <><FaCloudUploadAlt /> Publish and View</>}
                    </Button>
                </div>
            </form>
        </section>
    );
};

export default AddSubCategory;
