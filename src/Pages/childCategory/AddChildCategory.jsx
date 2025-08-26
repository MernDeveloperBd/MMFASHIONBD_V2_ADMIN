
import { Button, MenuItem, Select } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useState } from 'react';

const AddChildCategory = () => {
    const [productCat, setProductCat] = useState('');
    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
    };
    return (
        <section className='p-5 bg-gray-50'>
            <form className='form py-3 p-8'>
                <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4 pb-4">
                    {/*  */}
                      <div className="grid grid-cols-4 mb-3 gap-3">
                        {/* Category */}
                        <div className="col">
                            <h3 className="text-[14px] font-[500] mb-2">Add Child Category</h3>
                            <Select
                                labelId="demo-simple-select-label"
                                id="productCatDrop"
                                size='small'
                                className='w-full'
                                value={productCat}
                                label="Age"
                                onChange={handleChangeProductCat}
                            >
                                <MenuItem value={'none'}>None</MenuItem>
                                <MenuItem value={'panjabi'}>Panjabi</MenuItem>
                                <MenuItem value={'ator'}>Ator</MenuItem>
                                <MenuItem value={'jainamaz'}>Jainamaz</MenuItem>
                            </Select>
                        </div>
                      
                    </div>
                    {/*  */}
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col w-[25%]">
                            <h3 className="text-[16px] font-[600] mb-1">Child Category Name</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " />
                        </div>
                    </div>
                </div>
                <Button type='button' className=' btn-blue flex items-center justify-center gap-2 font-[600]'><FaCloudUploadAlt className='text-[20px]' />Publish and View</Button>
            </form>

        </section>
    );
};

export default AddChildCategory;