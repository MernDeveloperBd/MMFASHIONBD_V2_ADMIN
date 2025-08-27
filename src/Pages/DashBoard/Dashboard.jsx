import Button from "@mui/material/Button";
import DashboardBox from "./DashboardBox/DashboardBox";
import { FaPlus } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa";

import { useContext, useEffect, useState } from "react";
import Badge from "../../Components/Badge/Badge";
import Charts from "../Charts/Charts";
import Products from "../Products/Products";
import { MyContext } from "../../App";


// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Dashboard = () => {
    const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null)
    // const [categoryFilterValue, setCategoryFilterValue] = useState('All');
    const{setIsOpenFullScreenPanel} = useContext(MyContext)
    // grettings message start
     const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    let message = "Good Night"; // default

    if (hours >= 5 && (hours < 12 || (hours === 12 && minutes === 0))) {
      message = "Good Morning";
    } else if ((hours === 12 && minutes > 0) || (hours > 12 && hours < 17) || (hours === 17 && minutes === 0)) {
      message = "Good Afternoon";
    } else if ((hours === 17 && minutes > 0) || (hours > 17 && hours < 20) || (hours === 20 && minutes === 0)) {
      message = "Good Evening";
    } else {
      message = "Good Night";
    }

    setGreeting(message);
  }, []);
    // grettings message end

   

    const isShowOrderedProduct = (index) => {
        if (isOpenOrderedProduct === index) {
            setIsOpenOrderedProduct(null)
        } else {
            setIsOpenOrderedProduct(index)
        }
    }
    return (
        <>
            <div className="w-full p-5 rounded-md border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center justify-between gap-8 mb-5">
                <div className="info">
                    <h1 className="text-[30px] font-[600] leading-9 mb-3">
      {greeting}, Marifa Akter
    </h1>
                    <p>Here's what happening on your store today. See the statistics at once.</p>
                    <Button onClick={()=>setIsOpenFullScreenPanel({open:true,model:'Add Product'})} className="btn-blue !capitalize !mt-4"><FaPlus />Add Product</Button>
                </div>
                <img src="/shop.webp" alt="logo" className="w-[300px] rounded-md" />
            </div>
            <div className="pb-4">
                <DashboardBox />
            </div>
            {/* Products*/}
           <Products/>
            {/* table Recent Orders*/}
            <div className="card my-3 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center justify-between p-5">
                    <h3 className="text-[20px] font-[700]">Recent Orders</h3>
                </div>
                <div className="relative overflow-x-auto mt-5 mb-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3">
                                    &nbsp;
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Order Id
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Payment Id
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Total Amount
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    User Id
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Order Status
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td className="px-6 py-4">
                                    <Button onClick={() => isShowOrderedProduct(0)} className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                                        {isOpenOrderedProduct === 0 ? <FaAngleUp className="text-[18px]" /> : <FaAngleDown className="text-[18px]" />}
                                    </Button>
                                </td>
                                <td className="px-6 py-4">
                                    id123456
                                </td>
                                <td className="px-6 py-4">
                                    SPI2546587s74
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    Abdul Aziz
                                </td>
                                <td className="px-6 py-4">
                                    +880157845896
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    Dhaka, Dhanmondi, kasdfs
                                </td>
                                <td className="px-6 py-4">
                                    Tk 2999
                                </td>
                                <td className="px-6 py-4">
                                    merndevelpler@gmail.com
                                </td>
                                <td className="px-6 py-4">
                                    UI564555
                                </td>
                                <td className="px-6 py-4">
                                    <Badge status="Delivered" />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    17 Jun 2025
                                </td>

                            </tr>
                            {
                                isOpenOrderedProduct === 0 && (
                                    <tr>
                                        <td className="bg-[#f1f1f1]" colSpan={12}>
                                            <div className=" overflow-x-auto mt-5">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <td className="px-6 py-4">
                                                                &nbsp;
                                                            </td>

                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Product Id
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Product Title
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Image
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Quantity
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Price
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Sub Total
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                            <td className="px-6 py-4">
                                                                &nbsp;
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                id123456
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Product title here
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <img src="https://res.cloudinary.com/dqokqca8p/image/upload/v1756018288/My%20Brand/Misam_Marifa_Fashion_World_jkz3o8.png" alt="" className="w-12 h-12 rounded-md object-cover" />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                02
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Dhaka, Dhanmondi, kasdfs
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Tk 2999
                                                            </td>



                                                        </tr>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                            <td className="px-6 py-4">
                                                                &nbsp;
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                id123456
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Product title here
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <img src="https://res.cloudinary.com/dqokqca8p/image/upload/v1756018288/My%20Brand/Misam_Marifa_Fashion_World_jkz3o8.png" alt="" className="w-12 h-12 rounded-md object-cover" />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                02
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Dhaka, Dhanmondi, kasdfs
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Tk 2999
                                                            </td>



                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                            {/* next row */}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td className="px-6 py-4">
                                    <Button onClick={() => isShowOrderedProduct(1)} className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]">
                                        {isOpenOrderedProduct === 1 ? <FaAngleUp className="text-[18px]" /> : <FaAngleDown className="text-[18px]" />}
                                    </Button>
                                </td>
                                <td className="px-6 py-4">
                                    id123456
                                </td>
                                <td className="px-6 py-4">
                                    SPI2546587s74
                                </td>
                                <td className="px-6 py-4">
                                    Abdul Aziz
                                </td>
                                <td className="px-6 py-4">
                                    +880157845896
                                </td>
                                <td className="px-6 py-4">
                                    Dhaka, Dhanmondi, kasdfs
                                </td>
                                <td className="px-6 py-4">
                                    Tk 2999
                                </td>
                                <td className="px-6 py-4">
                                    merndevelpler@gmail.com
                                </td>
                                <td className="px-6 py-4">
                                    UI564555
                                </td>
                                <td className="px-6 py-4">
                                    <Badge status="Delivered" />
                                </td>
                                <td className="px-6 py-4">
                                    17 Jun 2025
                                </td>

                            </tr>
                            {
                                isOpenOrderedProduct === 1 && (
                                    <tr>
                                        <td className="bg-[#f1f1f1]" colSpan={12}>
                                            <div className=" overflow-x-auto mt-5">
                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <td className="px-6 py-4">
                                                                &nbsp;
                                                            </td>

                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Product Id
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Product Title
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Image
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Quantity
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Price
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                                Sub Total
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                            <td className="px-6 py-4">
                                                                &nbsp;
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                id123456
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Product title here
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <img src="https://res.cloudinary.com/dqokqca8p/image/upload/v1756018288/My%20Brand/Misam_Marifa_Fashion_World_jkz3o8.png" alt="" className="w-12 h-12 rounded-md object-cover" />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                02
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Dhaka, Dhanmondi, kasdfs
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Tk 2999
                                                            </td>



                                                        </tr>
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                                            <td className="px-6 py-4">
                                                                &nbsp;
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                id123456
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Product title here
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <img src="https://res.cloudinary.com/dqokqca8p/image/upload/v1756018288/My%20Brand/Misam_Marifa_Fashion_World_jkz3o8.png" alt="" className="w-12 h-12 rounded-md object-cover" />
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                02
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Dhaka, Dhanmondi, kasdfs
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                Tk 2999
                                                            </td>



                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                            {/* next row end */}

                        </tbody>
                    </table>
                </div>


            </div>
            {/* Chatrs */}
            <Charts/>
        </>
    );
};

export default Dashboard;