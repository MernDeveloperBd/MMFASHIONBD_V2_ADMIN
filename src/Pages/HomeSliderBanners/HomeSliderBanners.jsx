import { Button } from "@mui/material";
import { CgExport } from "react-icons/cg";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Tooltip from "@mui/material/Tooltip";
import Pagination from '@mui/material/Pagination';
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const HomeSliderBanners = () => {
    const { isOpenFullScreenPanel, setIsOpenFullScreenPanel } = useContext(MyContext)
    const [slideData, setSlideData] = useState([])

    useEffect(() => {
        getData()
    }, [isOpenFullScreenPanel])

    const getData = () => {
        fetchDataFromApi("/api/homeSlides").then((res) => {
            setSlideData(res?.data);
        })

    }


    const deleteSlide = (id) => {
        deleteData(`/api/homeSlides/${id}`).then((res) => {
            isOpenFullScreenPanel('success', "Slide deleted success")
            getData()
        })
    }

    return (
        <>
            <div className="">
                {/* Products*/}
                <div className="card my- shadow-md sm:rounded-lg bg-white">
                    <div className="flex items-center px-5 py-4 ">
                        <h3 className="text-[20px] font-[700]">Home Slider Banner</h3>
                        <div className="col ml-auto w-[30%] flex items-center gap-2 justify-end ">
                            <Button className="!bg-green-600 !text-white !font-[600] flex items-center gap-1"><CgExport className="text-[18px]" />Export</Button>
                            <Button onClick={() => setIsOpenFullScreenPanel({ open: true, model: 'Add Home Slide' })} className="btn-blue btn-sm !font-[600]">Add Home Slide</Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between px-5 ">
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
                                        Product
                                    </th>

                                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* next row */}
                                {
                                    slideData?.length !== 0 && slideData?.map((item, index) => {
                                        return (
                                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                                <td className="px-6 py-2">
                                                    <Checkbox {...label} size="small" />
                                                </td>
                                                <td className="px-1 py-2">
                                                    <div className="flex items-center gap-4 ">
                                                        <div className="img w-[40%] h-[85px] rounded-md overflow-hidden group">
                                                            <Link to={`/product/1234`}>
                                                                <img src={item.images[0]} alt="product image" className="w-full group-hover:scale-105 transition-all" />
                                                            </Link>
                                                        </div>

                                                    </div>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <Tooltip title="Edit" placement="top">
                                                            <Button className="!w-[35px] !h-[35px] !min-w-[35px]"><AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[22px]" onClick={() => setIsOpenFullScreenPanel({ open: true, model: 'Edit HOme Slide', id: item?._id })} /></Button>
                                                        </Tooltip>
                                                        <Tooltip title="Delete" placement="top">
                                                            <Button onClick={() => deleteSlide(item?._id)} className="!w-[35px] !h-[35px] !min-w-[35px]"><MdDeleteOutline className="text-[#8b1c1c] text-[22px]" /></Button></Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }



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

export default HomeSliderBanners;