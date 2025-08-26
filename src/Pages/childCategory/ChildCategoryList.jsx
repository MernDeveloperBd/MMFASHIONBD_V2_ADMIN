import { Button } from "@mui/material";
import { CgExport } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import Select from '@mui/material/Select';
import { useContext, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Tooltip from "@mui/material/Tooltip";
import Pagination from '@mui/material/Pagination';
import SearchBox from "../../Components/SearchBox/SearchBox";
import { MyContext } from "../../App";
import Chip from '@mui/material/Chip';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const ChildCategoryList = () => {
    const [categoryFilterValue, setCategoryFilterValue] = useState('All');
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const { setIsOpenFullScreenPanel } = useContext(MyContext)

    const handleChangeCatFilter = (event) => {
        setCategoryFilterValue(event.target.value);
    };

    return (
        <>
            <div className="">
                {/* Products*/}
                <div className="card my- shadow-md sm:rounded-lg bg-white">
                    <div className="flex items-center px-5 py-4 ">
                        <h3 className="text-[20px] font-[700]">Child Category List</h3>
                        <div className="col ml-auto w-[30%] flex items-center gap-2 justify-end ">
                            <Button className="!bg-green-600 !text-white !font-[600] flex items-center gap-1"><CgExport className="text-[18px]" />Export</Button>
                            <Button onClick={() => setIsOpenFullScreenPanel({ open: true, model: 'Add Child Category' })} className="btn-blue btn-sm !font-[600]">Add Child Categoy</Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-5 ">
                    </div>
                    {/* select category */}
                    <div className="flex items-center w-full px-5 justify-between">
                        <div className="col w-[20%]">
                            <h4 className="text-[13px] font-[600] mb-3">Child Category By</h4>
                            <Select
                                className="w-full"
                                size="small"
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={categoryFilterValue}
                                label="Category"
                                onChange={handleChangeCatFilter}
                            >
                                <MenuItem value="All">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value={10}>Panjabi</MenuItem>
                                <MenuItem value={20}>Tshirt</MenuItem>
                                <MenuItem value={30}>Ator</MenuItem>
                            </Select>
                        </div>
                        {/* Search box */}
                        <div className="col w-[20%] ml-auto">
                            <SearchBox />
                        </div>
                    </div>
                    {/*  */}
                    <div className="relative overflow-x-auto mt-5 mb-5 ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-100 uppercase bg-blue-600 dark:bg-gray-700 ">
                                <tr>
                                    <th className="px-6 py-2 w-[80px]">
                                        <Checkbox {...label} size="small" className="!text-white" />
                                    </th>
                                    <th scope="col" className="px-1 py-2 whitespace-nowrap">
                                        Sub Cataegory Image
                                    </th>
                                    <th scope="col" className="px-1 py-2 whitespace-nowrap">
                                        Sub Cataegory Name
                                    </th>
                                    <th scope="col" className="px-1 py-2 whitespace-nowrap">
                                        Child Cataegory Name
                                    </th>

                                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* next row */}
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td className="px-6 py-2">
                                        <Checkbox {...label} size="small" />
                                    </td>
                                    <td className="px-1 py-2">
                                        <div className="flex items-center gap-4 w-[70px] h-[70px]">
                                            <div className="img w-full rounded-full overflow-hidden group">
                                                <Link to={`/product/1234`}>
                                                    <img src="https://i.ibb.co/cc5Jj9k4/Premium-Cotton-Print-Panjabi-1400-a-kenakata-bazar-bd.jpg" alt="product image" className="w-full group-hover:scale-105 transition-all" />
                                                </Link>
                                            </div>

                                        </div>
                                    </td>
                                    <td className="px-6 py-2">
                                        <Chip label="Panjabi" />
                                    </td>
                                    <td className="px-6 py-2">
                                        <div className="flex items-center gap-2">
                                            <Chip label="Deshi" color="primary"/>
                                            <Chip label="jamdani" color="primary"/>
                                            <Chip label="suti" color="primary"/>

                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-2">
                                            <Tooltip title="Edit" placement="top">
                                                <Button className="!w-[35px] !h-[35px] !min-w-[35px]"><AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[22px]" /></Button>
                                            </Tooltip>
                                            <Tooltip title="Delete" placement="top">
                                                <Button className="!w-[35px] !h-[35px] !min-w-[35px]"><MdDeleteOutline className="text-[#8b1c1c] text-[22px]" /></Button></Tooltip>
                                        </div>
                                    </td>
                                </tr>


                            </tbody>

                        </table>
                    </div>
                    {/* pagination */}
                    <div className="pb-4 px-4 flex justify-end">
                        <Pagination count={10} color="primary" />
                    </div>

                </div>

            </div>
        </>
    );
};

export default ChildCategoryList;