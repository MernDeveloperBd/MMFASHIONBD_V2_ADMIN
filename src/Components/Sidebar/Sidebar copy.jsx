import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { FaAngleDown, FaRegImage, FaUser } from 'react-icons/fa';
import { RiProductHuntLine } from 'react-icons/ri';
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from 'react-icons/io5';
import { MdLogout } from "react-icons/md";
import {Collapse} from 'react-collapse';
import { useContext, useState } from 'react';
import { MyContext } from '../../App';

const Sidebar = () => {
    const[subMenuIndex, setSubMenuIndex] = useState(null)
    const {isSideBarOpen, setIsOpenFullScreenPanel} = useContext(MyContext)
    const isOpenSubMenu = (index) =>{
        if(subMenuIndex === index){
            setSubMenuIndex(null)
        }else{
            setSubMenuIndex(index)
        }
    }
    return (
        <>
            <div className={`sidebar fixed top-0 left-0 bg-[#fff] w-[18%] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 ${isSideBarOpen === true ? 'w-[18%]' : 'w-[0px]'}`}>
                <div className="py-2 w-full">
                    <Link to='/' className='flex items-center gap-2'>
                    <img src="https://res.cloudinary.com/dqokqca8p/image/upload/v1756018288/My%20Brand/Misam_Marifa_Fashion_World_jkz3o8.png" alt="logo" className='w-8 h-8 rounded-md' />
                    <h2 className='text-[16px] font-semibold'>MM Fashion World</h2>
                    </Link>
                </div>
                {/*  */}
                <ul>
                    <li>
                        <Link to='/'>
                        
                        <Button className='w-full !capitalize !justify-start flex gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]'><RxDashboard className='text-[16px]'/> <span>Dashboard</span></Button>
                        </Link>
                    </li>
                    {/* Home slides */}
                    <li>
                        <Button onClick={()=>isOpenSubMenu(1)} className='w-full !capitalize !justify-start flex gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]'><FaRegImage className='text-[16px]'/> <span>Home Slides</span><span className='ml-auto w-[30px] h-[30px] flex items-center' ><FaAngleDown className={`transition-all ${subMenuIndex === 1 ? 'rotate-180':''}`} /></span> 
                        </Button>
                        {/* submenu */}
                        <Collapse isOpened={subMenuIndex === 1 ? true : false}>
                        <ul className='w-full'>
                            <li className='w-full'>
                                <Link to='/homeSlider/list'>
                                <Button className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span> Home Banner List</Button>
                                </Link>
                            </li>
                            <li className='w-full'>
                                <Button onClick={()=>setIsOpenFullScreenPanel({open:true, model:"Add Home Slide"})}  className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Add Home Bannder Slider</Button>
                            </li>
                        </ul></Collapse>                        
                    </li>
                    {/* users */}
                    <li>
                        <Link to='/users'>                        
                        <Button className='w-full !capitalize !justify-start flex gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]'><FaUser className='text-[16px]'/> <span>Users</span></Button>
                        </Link>
                    </li>
                    {/* Products start here */}
                     <li>
                        <Button  onClick={()=>isOpenSubMenu(2)}  className='w-full !capitalize !justify-start flex gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]'><RiProductHuntLine className='text-[16px]'/> <span>Products</span><span className='ml-auto w-[30px] h-[30px] flex items-center' ><FaAngleDown className={`transition-all ${subMenuIndex === 2 ? 'rotate-180':''}`} /></span> 
                        </Button>
                        {/* submenu */}
                        <Collapse isOpened={subMenuIndex === 2 ? true : false}>
                        <ul className='w-full'>
                            <li className='w-full'>
                                <Link to='/products'>
                                <Button className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Product List</Button>
                                </Link>
                            </li>
                            <li className='w-full'>
                               
                                <Button onClick={()=>setIsOpenFullScreenPanel({open:true, model:"Add Product"})} className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Product Upload</Button>
                              
                            </li>
                            <li className='w-full'>                               
                              <Link to='/product/addSize'>
                                <Button className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Add Product Size</Button>
                              </Link>                              
                            </li>
                            <li className='w-full'>                               
                              <Link to='/product/addColor'>
                                <Button className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Add Product Color</Button>
                              </Link>                              
                            </li>
                        </ul>
                        </Collapse>
                        
                    </li>
                    {/* Products end here */}
                     {/* Products start here */}
                     <li>
                        <Button onClick={()=>isOpenSubMenu(3)} className='w-full !capitalize !justify-start flex gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]'><TbCategory className='text-[16px]'/> <span>Category</span><span className='ml-auto w-[30px] h-[30px] flex items-center' ><FaAngleDown className={`transition-all ${subMenuIndex === 3 ? 'rotate-180':''}`} /></span> 
                        </Button>
                        {/* submenu */}
                        <Collapse isOpened={subMenuIndex === 3 ? true : false}>
                        <ul className='w-full'>
                            <li className='w-full'>
                                <Link to='/category/list'>
                                <Button className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Category List</Button>
                                </Link>
                            </li>
                            <li className='w-full'>
                                <Button onClick={()=>setIsOpenFullScreenPanel({open:true, model:"Add Category"})}  className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Add a Category</Button>
                               
                            </li>
                            <li className='w-full'>
                                <Link to='/subCategory/list'>
                                <Button className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Sub Category List</Button>
                                </Link>
                            </li>
                            <li className='w-full'>
                                
                                <Button onClick={()=>setIsOpenFullScreenPanel({open:true, model:"Add Sub Category"})} className=' !text-[rgba(0,0,0,0.8)] !justify-start !capitalize w-full !text-[13px] !pl-6 flex gap-2'><span className='block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.2)]'></span>Add a Sub Category</Button>
                              
                            </li> 
                        </ul></Collapse>
                        
                    </li>
                    {/* Products end here */}
                    <li>
                        <Link to='/orders'>
                        <Button className='w-full !capitalize !justify-start flex gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]'><IoBagCheckOutline className='text-[16px]'/> <span>Orders</span></Button>
                        </Link>
                    </li>
                    <li>
                        <Button className='w-full !capitalize !justify-start flex gap-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-2 hover:!bg-[#f1f1f1]'><MdLogout className='text-[16px]'/> <span>Logout</span></Button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;