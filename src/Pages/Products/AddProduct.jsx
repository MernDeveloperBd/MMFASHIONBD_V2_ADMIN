
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext, useState } from 'react';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { Button, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from '../../App';
import { deleteImages, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const MenuProps = {
    PaperProps: {
        style: {
            width: 250
        }
    }
}

const AddProduct = () => {
    const { cateData, setIsOpenFullScreenPanel, openAlertBox } = useContext(MyContext)
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
    const [productFeatured, setproductFeatured] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productSize, setProductSize] = useState([]);
    const [color, setColor] = useState([]);
    const [previews, setPriviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const [formFields, setFormFields] = useState({
        name: "",
        images: [],
        description: "",
        brand: "",
        shopName: "",
        facebookURL: "",
        price: "",
        oldPrice: "",
        resellingPrice: "",
        category:"",
        catName: "",
        catId: "",
        subCat: "",
        subCatId: "",
        thirdSubCat: "",
        thirdSubCatId: "",
        countInStock: "",
        rating: "",
        isFeatured: false,
        productSize: [],
        color: [],
        productWeight: "",
        location: "",
        dateCreated: "",

    });


    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        formFields.catId = event.target.value
        formFields.category = event.target.value        
    };
    
    const selectCatByName = (name) => {
        formFields.catName = name
    }
    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
        formFields.subCatId = event.target.value
    };
    const selectSubCatByName = (name) => {
        formFields.subCat = name
    }
    const handleChangeProductThirdLavelCat = (event) => {
        setProductThirdLavelCat(event.target.value);
        formFields.thirdSubCatId = event.target.value
    };
    const selectThirdLavelCatByName = (name) => {
        formFields.thirdSubCat = name
    }
    const handleChangeProductFeatured = (event) => {
        setproductFeatured(event.target.value);
        formFields.isFeatured = event.target.value
    };

    const handleChangeProductWeight = (event) => {
        setProductWeight(event.target.value);
        const {
            target: { value }
        } = event;
        setProductWeight(typeof value === 'string' ? value.split(",") : value)
        formFields.productWeight = value
    };
    const handleChangeColor = (event) => {
        const {
            target: { value }
        } = event;
        setColor(typeof value === 'string' ? value.split(",") : value)
        formFields.color = value
    };
    const handleChangeProductSize = (event) => {
        const {
            target: { value }
        } = event;
        setProductSize(typeof value === 'string' ? value.split(",") : value)
        formFields.productSize = value
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    };
    const onChangeRating = (e) => {
        setFormFields(() => (
            {
                ...formFields,
                rating: e.target.value
            }
        ))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(formFields.name === ""){
            openAlertBox("error", "Please Enter your product Name")
            return false;
        }
        if(formFields.description === ""){
            openAlertBox("error", "Please Enter your description Name")
            return false;
        }
        if(formFields.price === ""){
            openAlertBox("error", "Please Enter your product price")
            return false;
        }
        if(formFields.catId === ""){
            openAlertBox("error", "Please Select product Category")
            return false;
        }
        if(formFields.countInStock === ""){
            openAlertBox("error", "Please Enter Product Stock")
            return false;
        }
        if(formFields.rating === ""){
            openAlertBox("error", "Please Enter Product rating")
            return false;
        }
        setIsLoading(true)
        postData("/api/product/createProduct", formFields).then((res) => {
            if(res?.error === false){                
                 setTimeout(() => {
                setIsLoading(false)
                setIsOpenFullScreenPanel({ open: false })
                navigate('/products')  
                openAlertBox("success", res?.message)  
            }, 2500) 
            
            }else{
                setIsLoading(false)
                openAlertBox("error", "Product uploaded failed")
            }
           
          })
    }
    const setPriviewsFun = (previewsArr) => {
        setPriviews(previewsArr);
        setFormFields({
            ...formFields,
            images: previewsArr
        });
    };
    const removeImg = (image, index) => {
        var imageArr = []
        imageArr = previews
        deleteImages(`/api/category/deleteImage?img=${image}`).then(() => {
            previews.splice(index, 1)
            setPriviews([])
            setTimeout(() => {
                setPriviews(imageArr)
                setFormFields({
                    ...formFields,
                    images: imageArr
                });
            }, 50)
        })
    };

    return (
        <section className="p-5 bg-gray-50" >
            <form className='form py-3 p-8 ' onSubmit={handleSubmit}>
                <div className='max-h-[75vh] overflow-y-scroll pr-2 mb-3'>
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Title</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='name' value={formFields.name} onChange={onChangeInput} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Description</h3>
                            <textarea type="text" className="w-full border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm" rows={5} name='description' value={formFields.description} onChange={onChangeInput} />
                        </div>
                    </div>
                    {/* Category, Sub, Child, Price */}
                    <div className="grid grid-cols-4 mb-3 gap-3">
                        {/* Category */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Category</h3>
                            {
                                cateData?.length !== 0 && <Select
                                    id='productCatDrop'
                                    size='small'
                                    className='w-full'
                                    value={productCat}
                                    label="Category"
                                    onChange={handleChangeProductCat}
                                >
                                    {
                                        cateData?.map((cat, index) => {
                                            return (
                                                <MenuItem key={index} value={cat?._id} onClick={() => selectCatByName(cat?.name)}>{cat?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        {/* Sub Category */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2"> SubCategory</h3>
                            {
                                cateData?.length !== 0 && <Select
                                    id='productSubCatDrop'
                                    size='small'
                                    className='w-full'
                                    value={productSubCat}
                                    label="Sub Category"
                                    onChange={handleChangeProductSubCat}
                                >
                                    {
                                        cateData?.map((cat) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                                                    return (
                                                        <MenuItem key={index_} value={subCat?._id} onClick={() => selectSubCatByName(subCat?.name)}>{subCat?.name}</MenuItem>
                                                    )
                                                })


                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        {/* Child Category */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2"> Child Category</h3>
                            {
                                cateData?.length !== 0 && <Select
                                    id='productCatDrop'
                                    size='small'
                                    className='w-full'
                                    value={productThirdLavelCat}
                                    label="Third Lavel Category"
                                    onChange={handleChangeProductThirdLavelCat}
                                >
                                    {
                                        cateData?.map((cat) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((subCat) => {
                                                    return (
                                                        subCat?.children?.length !== 0 && subCat?.children?.map((thirdLabelCat, index__) => {
                                                            return (
                                                                <MenuItem key={index__} value={thirdLabelCat?._id}
                                                                    onClick={() => selectThirdLavelCatByName(thirdLabelCat?.name)}
                                                                >{thirdLabelCat?.name}</MenuItem>
                                                            )
                                                        })

                                                    )
                                                })


                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>

                        {/* Price */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Price</h3>
                            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield]" name='price' value={formFields.price} onChange={onChangeInput} />
                        </div>
                    </div>
                    {/* Old Price , Price,Quantity, Brand */}
                    <div className="grid grid-cols-4 mb-3 gap-3">
                        {/* Old Price */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2"> Old Price</h3>
                            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='oldPrice' value={formFields.oldPrice} onChange={onChangeInput} />
                        </div>
                        {/* Price */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Reselling Price</h3>
                            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield]" name='resellingPrice' value={formFields.resellingPrice} onChange={onChangeInput} />
                        </div>

                        {/* Quantity */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Quantity</h3>
                            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='countInStock' value={formFields.countInStock} onChange={onChangeInput} />
                        </div>
                        {/* Brand */}
                        <div className="grid grid-cols-1 mb-3">
                            <div className="col">
                                <h3 className="text-[14px] font-[500] mb-1">Brand</h3>
                                <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='brand' value={formFields.brand} onChange={onChangeInput} />
                            </div>
                        </div>

                    </div>
                    {/* Discount, Weight, size, shopname */}
                    <div className="grid grid-cols-4 mb-3 gap-3">
                        {/* color */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Color</h3>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="color"
                                name="color"
                                size='small'
                                className='w-full'
                                value={color}
                                label="Product weight"
                                onChange={handleChangeColor}
                                MenuProps={MenuProps}
                            >
                                <MenuItem value={"red"}>Red</MenuItem>
                                <MenuItem value={"pink"}>Pink</MenuItem>
                                <MenuItem value={"white"}>White</MenuItem>
                                <MenuItem value={"grey"}>Grey</MenuItem>
                                <MenuItem value={"blue"}>Blue</MenuItem>
                                <MenuItem value={"green"}>Green</MenuItem>
                                <MenuItem value={"pink"}>Pink</MenuItem>
                            </Select>
                        </div>
                        {/* Weight */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Product Weight</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productWeight"
                                size='small'
                                className='w-full'
                                value={productWeight}
                                label="Product weight"
                                onChange={handleChangeProductWeight}
                            >
                                <MenuItem value={500}>500 gm</MenuItem>
                                <MenuItem value={700}>700 gm</MenuItem>
                                <MenuItem value={1000}>1 kg</MenuItem>
                            </Select>
                        </div>
                        {/* Size */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Size</h3>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="productSize"
                                size='small'
                                className='w-full'
                                value={productSize}
                                label="Product size"
                                onChange={handleChangeProductSize}
                                MenuProps={MenuProps}
                            >
                                <MenuItem value={'small'}>Small</MenuItem>
                                <MenuItem value={'medium'}>Medium</MenuItem>
                                <MenuItem value={'large'}>Large</MenuItem>
                            </Select>
                        </div>
                        {/* shopName */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">ShopName</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='shopName' value={formFields.shopName} onChange={onChangeInput} />
                        </div>

                    </div>
                    {/*Whatapp, Color,facebook url, Popular*/}
                    <div className="grid grid-cols-4 mb-3 gap-3">
                        {/* Whatsapp */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">WhatsAppNum</h3>
                            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='whatsApp' value={formFields.whatsApp} onChange={onChangeInput} />
                        </div>                       
                        {/* Popular */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Is Featured</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productFeatured}
                                label="Product Featured"
                                onChange={handleChangeProductFeatured}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </Select>
                        </div>
                        {/* facebookUrl */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">FacebookURL</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='facebookURL' value={formFields.facebookURL} onChange={onChangeInput} />
                        </div>
                             {/* Rating */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Rating</h3>
                            <Rating name="half-rating" defaultValue={1} precision={0.5}
                                onChange={onChangeRating}
                            />
                        </div>
                    </div>
                    {/* Media upload  */}
                    <div className="col w-full py-5 bg-white">
                        <div className="grid grid-cols-9 gap-3">
                            {
                                previews?.length !== 0 && previews?.map((image, index) => {
                                    return (
                                        <div key={index} className="uploadBoxWrapper relative">
                                            <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] z-50 flex items-center justify-center cursor-pointer' onClick={() => removeImg(image, index)}><IoMdClose className='text-white' /></span>

                                            <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[120px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                                <img src={image} alt={"Image"} className='w-full h-full object-cover' />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                            <UploadBox multiple={true} name="images" url="/api/product/uploadImages" setPriviews={setPriviewsFun} />
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

        </section>
    );
};

export default AddProduct;