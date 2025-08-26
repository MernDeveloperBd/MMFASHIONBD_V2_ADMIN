import { Swiper, SwiperSlide } from 'swiper/react';
import { FiGift } from "react-icons/fi";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import {  Navigation } from 'swiper/modules';
import { IoStatsChartSharp } from 'react-icons/io5';
import { FiPieChart } from "react-icons/fi";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";


const DashboardBox = () => {
     
    return (
        <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
            <div className="box p-5 cursor-pointer bg-white hover:bg-[#f1f1f1] transition-all duration-300 rounded-md border flex items-center gap-4 border-[rgba(0,0,0,0.1)]">
                    <FiGift className='text-[40px] text-[#3872fa]'/>
                <div className="info w-[70%]">
                    <h3>New Orders</h3>
                    <b>1240</b>
                </div>
                <IoStatsChartSharp className='text-[50px] text-[#3872fa]'/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box p-5 cursor-pointer bg-white hover:bg-[#f1f1f1] transition-all duration-300 rounded-md border flex items-center gap-4 border-[rgba(0,0,0,0.1)]">
                    <FiPieChart className='text-[40px] text-[#10b981]'/>
                <div className="info w-[70%]">
                    <h3>Sales</h3>
                    <b>Tk <span>1250</span></b>
                </div>
                <IoStatsChartSharp className='text-[50px] text-[#10b981]'/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box p-5 cursor-pointer bg-white hover:bg-[#f1f1f1] transition-all duration-300 rounded-md border flex items-center gap-4 border-[rgba(0,0,0,0.1)]">
                    <BsBank className='text-[40px] text-[#6a27acd5]'/>
                <div className="info w-[70%]">
                    <h3>Revinue</h3>
                    <b>Tk <span>12050</span></b>
                </div>
                <IoStatsChartSharp className='text-[30px] text-[#6a27acd3]'/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box p-5 cursor-pointer bg-white hover:bg-[#f1f1f1] transition-all duration-300 rounded-md border flex items-center gap-4 border-[rgba(0,0,0,0.1)]">
                    <RiProductHuntLine className='text-[40px] text-[#306cfa]'/>
                <div className="info w-[70%]">
                    <h3>Total Products</h3>
                    <b>257</b>
                </div>
                <IoStatsChartSharp className='text-[50px] text-[#2f6cf8]'/>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
    );
};

export default DashboardBox;