
import { useContext, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import SearchBox from "../../Components/SearchBox/SearchBox";
import { MyContext } from "../../App";
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhoneAlt, FaRegCalendarAlt } from "react-icons/fa";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Users = () => {
    
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
                <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
                    <div className="flex items-center px-5 py-4 ">
                        <h3 className="text-[20px] font-[700]">Users List ( <span>11</span> )</h3>
                       {/* Search box */}
                        <div className="col w-[40%] ml-auto">
                            <SearchBox />
                        </div>
                    </div>
                    {/*  */}
                    <div className="relative overflow-x-auto mb-5 ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-100 uppercase bg-blue-600 dark:bg-gray-700 ">
                                <tr>
                                    <th className="px-6 py-2">
                                        <Checkbox {...label} size="small" className="!text-white" />
                                    </th>
                                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                                        User image
                                    </th>
                                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                                        User Name
                                    </th>
                                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                                        User Email
                                    </th>
                                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                                        Phone Number
                                    </th>
                                  
                                    <th scope="col" className="px-3 py-2 whitespace-nowrap">
                                        Created
                                    </th>
                                  
                                </tr>
                            </thead>
                            <tbody>
                                {/* next row */}
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td className="px-6 py-2">
                                        <Checkbox {...label} size="small" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-4 w-[70px]">
                                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                                <Link to={`/product/1234`}>
                                                    <img src="https://mui.com/static/images/avatar/1.jpg" alt="user image" className="w-full group-hover:scale-105 transition-all" />
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        John doe
                                    </td>
                                    <td className="px-3 py-2">
                                       <div className="flex items-center gap-1">
                                        <span><MdMarkEmailRead/></span> <p>khanmd@gamil.com</p>
                                       </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-1">
                                        <span><FaPhoneAlt /></span> <p>01425896547</p>
                                       </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-1">
                                        <span><FaRegCalendarAlt /></span> <p>02-05-2025</p>
                                       </div>
                                    </td>
                                </tr>
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td className="px-6 py-2">
                                        <Checkbox {...label} size="small" />
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-4 w-[70px]">
                                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                                <Link to={`/product/1234`}>
                                                    <img src="https://mui.com/static/images/avatar/1.jpg" alt="user image" className="w-full group-hover:scale-105 transition-all" />
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        John doe
                                    </td>
                                    <td className="px-3 py-2">
                                       <div className="flex items-center gap-1">
                                        <span><MdMarkEmailRead/></span> <p>merndevelpler@gamil.com</p>
                                       </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-1">
                                        <span><FaPhoneAlt /></span> <p>01425896547</p>
                                       </div>
                                    </td>
                                    <td className="px-3 py-2">
                                        <div className="flex items-center gap-1">
                                        <span><FaRegCalendarAlt /></span> <p>02-05-2025</p>
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

export default Users;