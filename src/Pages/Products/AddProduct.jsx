
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { menuData } from '../../Components/FilterCatSubCat/filterCatSubCat';



const AddProduct = () => {
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [childCategory, setChildCategory] = useState('');
    const [popular, setPopular] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [color, setColor] = useState('');
    const [productSize, setProductSize] = useState('');

      // Selected category/subCategory খুঁজে বের করা
  const selectedCategory = menuData.find(cat => cat.title === category);
  const selectedSubCategory = selectedCategory?.sub?.find(sub => sub.title === subCategory);

    const handleChangeProductCat = (event) => {
        setCategory(event.target.value);
    };
    const handleChangeProductSubCat = (event) => {
        setSubCategory(event.target.value);
    };
    const handleChangeProductChildCat = (event) => {
        setChildCategory(event.target.value);
    };
    const handleChangeProductPopular = (event) => {
        setPopular(event.target.value);
    };
    const handleChangeProductWeight = (event) => {
        setProductWeight(event.target.value);
    };
    const handleChangeColor = (event) => {
        setColor(event.target.value);
    };
    const handleChangeProductSize = (event) => {
        setProductSize(event.target.value);
    };

    return (
        <section className="p-5 bg-gray-50">
            <form className='form py-3 p-8 '>
                <div className='max-h-[75vh] overflow-y-scroll pr-2 mb-3'>

                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Title</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-1">Description</h3>
                            <textarea type="text" className="w-full border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm" rows={5} />
                        </div>
                    </div>
                    {/* Category, Sub, Child, Price */}
          <div className="grid grid-cols-4 mb-3 gap-3">
            {/* Category */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">Category</h3>
              <Select
                size='small'
                className='w-full'
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory('');
                  setChildCategory('');
                }}
              >
                <MenuItem value="">Select</MenuItem>
                {menuData.map((cat, idx) => (
                  <MenuItem key={idx} value={cat.title}>{cat.title}</MenuItem>
                ))}
              </Select>
            </div>

            {/* Sub Category */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2"> SubCategory</h3>
              <Select
                size='small'
                className='w-full'
                value={subCategory}
                onChange={(e) => {
                  setSubCategory(e.target.value);
                  setChildCategory('');
                }}
                disabled={!category}
              >
                <MenuItem value="">Select</MenuItem>
                {selectedCategory?.sub?.map((sub, idx) => (
                  <MenuItem key={idx} value={sub.title}>{sub.title}</MenuItem>
                ))}
              </Select>
            </div>

            {/* Child Category */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2"> Child Category</h3>
              <Select
                size='small'
                className='w-full'
                value={childCategory}
                onChange={(e) => setChildCategory(e.target.value)}
                disabled={!subCategory}
              >
                <MenuItem value="">Select</MenuItem>
                {selectedSubCategory?.sub?.map((child, idx) => (
                  <MenuItem key={idx} value={child.title}>{child.title}</MenuItem>
                ))}
              </Select>
            </div>

            {/* Price */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">Price</h3>
              <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield]" />
            </div>
          </div>
                    {/*  */}
                    <div className="grid grid-cols-4 mb-3 gap-3">
                          {/* Old Price */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2"> Old Price</h3>
                            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        {/* Popular */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Popular</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="popular"
                                size='small'
                                className='w-full'
                                value={popular}
                                label="Product Featured"
                                onChange={handleChangeProductPopular}
                            >
                                <MenuItem value={'true'}>True</MenuItem>
                                <MenuItem value={'false'}>False</MenuItem>
                            </Select>
                        </div>
                        {/* Price */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Quantity</h3>
                            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        {/* Brand */}
                        <div className="grid grid-cols-1 mb-3">
                            <div className="col">
                                <h3 className="text-[14px] font-[500] mb-1">Brand</h3>
                                <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " />
                            </div>
                        </div>
                      
                    </div>
                    {/* Discount, Weight, size, shopname */}
                    <div className="grid grid-cols-4 mb-3 gap-3">
                          {/* Discount */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Discount</h3>
                            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
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
                                <MenuItem value={'none'}>None</MenuItem>
                                <MenuItem value={500}>500 gm</MenuItem>
                                <MenuItem value={700}>700 gm</MenuItem>
                                <MenuItem value={1000}>1 kg</MenuItem>
                            </Select>
                        </div>
                        {/* Size */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Size</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productSize"
                                size='small'
                                className='w-full'
                                value={productSize}
                                label="Product size"
                                onChange={handleChangeProductSize}
                            >
                                <MenuItem value={'none'}>None</MenuItem>
                                <MenuItem value={'small'}>Samll</MenuItem>
                                <MenuItem value={'medium'}>Medium</MenuItem>
                                <MenuItem value={'large'}>Large</MenuItem>
                            </Select>
                        </div>
                         {/* shopName */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">ShopName</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        
                    </div>
                     {/*Whatapp, Color,facebook url, rating*/}
                    <div className="grid grid-cols-4 mb-3 gap-3">                        
                        {/* Whatsapp */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">WhatsAppNum</h3>
                            <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                        {/* color */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Color</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="color"
                                name="color"
                                size='small'
                                className='w-full'
                                value={color}
                                label="Product weight"
                                onChange={handleChangeColor}
                            >
                                <MenuItem value={'none'}>None</MenuItem>
                                <MenuItem value={"red"}>Red</MenuItem>
                                <MenuItem value={"green"}>Green</MenuItem>
                                <MenuItem value={"pink"}>Pink</MenuItem>
                            </Select>
                        </div>
                         {/* facebookUrl */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">FacebookURL</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                        </div>
                         {/* Rating */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Rating</h3>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                       
                    </div>
                    {/* Media upload  */}
                    <div className="col w-full py-5 bg-white">
                        <h3 className='font-[700] text-[18px] mb-2'>Media and Upload</h3>
                        <div className="grid grid-cols-9 gap-3">
                            <div className="uploadBoxWrapper relative">
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[10px] -right-[5px] z-50 flex items-center justify-center cursor-pointer'><IoMdClose className='text-white' /></span>
                                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[120px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                    <LazyLoadImage
                                        className='w-full h-full object-cover'
                                        alt={"Image"}
                                        src={'https://i.ibb.co/7JMWmf1M/Print-Panjabi-03-kenakata-bazar-bd.jpg'}
                                    />
                                </div>
                            </div>
                            <div className="uploadBoxWrapper relative">
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[10px] -right-[5px] z-50 flex items-center justify-center cursor-pointer'><IoMdClose className='text-white' /></span>
                                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[120px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                    <LazyLoadImage
                                        className='w-full h-full object-cover'
                                        alt={"Image"}
                                        src={'https://i.ibb.co/7JMWmf1M/Print-Panjabi-03-kenakata-bazar-bd.jpg'}
                                    />
                                </div>
                            </div>
                            <div className="uploadBoxWrapper relative">
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[10px] -right-[5px] z-50 flex items-center justify-center cursor-pointer'><IoMdClose className='text-white' /></span>
                                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[120px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                    <LazyLoadImage
                                        className='w-full h-full object-cover'
                                        alt={"Image"}
                                        src={'https://i.ibb.co/7JMWmf1M/Print-Panjabi-03-kenakata-bazar-bd.jpg'}
                                    />
                                </div>
                            </div>
                            <div className="uploadBoxWrapper relative">
                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[10px] -right-[5px] z-50 flex items-center justify-center cursor-pointer'><IoMdClose className='text-white' /></span>
                                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[120px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                    <LazyLoadImage
                                        className='w-full h-full object-cover'
                                        alt={"Image"}
                                        src={'https://i.ibb.co/7JMWmf1M/Print-Panjabi-03-kenakata-bazar-bd.jpg'}
                                    />
                                </div>
                            </div>
                            <UploadBox multiple={true} />
                        </div>
                    </div>
                </div>
                <Button type='button' className='w-full btn-blue flex items-center justify-center gap-2'><FaCloudUploadAlt className='text-[20px]' />Publish and View</Button>
            </form>

        </section>
    );
};

export default AddProduct;