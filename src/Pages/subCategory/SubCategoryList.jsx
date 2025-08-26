import { Button } from "@mui/material";
import { CgExport } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from "@mui/material/Tooltip";
import Pagination from '@mui/material/Pagination';
import SearchBox from "../../Components/SearchBox/SearchBox";
import { MyContext } from "../../App";
import Chip from '@mui/material/Chip';
import { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import EditSubCatBox from "./EditSubCatBox";



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const SubCategoryList = () => {
    const { setIsOpenFullScreenPanel, cateData } = useContext(MyContext)
    const [isOpen, setIsOpen] = useState(0)
    const expend = (index) => {
        if (isOpen === index) {
            setIsOpen(!isOpen)
        } else {
            setIsOpen(index)
        }
    }

    return (
        <>

            {/* Products*/}
            <div className="card my- shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center px-5 py-4 ">
                    <h3 className="text-[20px] font-[700]">Sub Category List </h3>
                    <div className="col ml-auto w-[30%] flex items-center gap-2 justify-end ">
                        <Button className="!bg-green-600 !text-white !font-[600] flex items-center gap-1"><CgExport className="text-[18px]" />Export</Button>
                        <Button onClick={() => setIsOpenFullScreenPanel({ open: true, model: 'Add Sub Category' })} className="btn-blue btn-sm !font-[600]">Add Sub Categoy</Button>
                    </div>
                </div>

            </div>

            {/*  */}
            <div className="card my-y pt-4 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
                {
                    cateData?.length !== 0 &&
                    <ul className="w-full">
                        {
                            cateData?.map((firstLevelCat, index) => {
                                return (
                                    <li className="w-full mb-1" key={index}>
                                        <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                                            <span className="font-[500] flex items-center gap-4 text-[14px]">
                                                {firstLevelCat?.name}
                                            </span>
                                            <Button className="!min-w-[35px] !w-[35px] !h-[35px] !ronded-full !text-black !ml-auto" onClick={() => expend(index)}>
                                                <FaAngleDown />
                                            </Button>
                                        </div>
                                        {
                                            isOpen === index && 
                                            <>
                                            {
                                                firstLevelCat?.children?.length !== 0  && 
                                                <ul className="w-full">
                                                    {
                                                      firstLevelCat?.children?.map((subCat, index) =>{
                                                        return (
                                                            <li className="w-full py-1" key={index}>
                                                                <EditSubCatBox name={subCat?.name}/>
                                                            </li>
                                                        )
                                                      })   
                                                    }
                                                </ul>
                                            }
                                            </>
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                }

            </div>

        </>
    );
};

export default SubCategoryList;