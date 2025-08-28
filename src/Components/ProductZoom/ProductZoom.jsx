import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.css';
// import 'react-inner-image-zoom/lib/styles.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';

const ProductZoom = () => {
    const[slideIndex, setSlideIndex] = useState(0)
    const zoomSliderBig = useRef()
    const zoomSliderSml = useRef()

    const goto = (index) =>{
        setSlideIndex(index)
        zoomSliderSml.current.Swiper.slideTo(index)
        zoomSliderBig.current.Swiper.slideTo(index)
    }
    return (
        <>
        <div className='flex gap-3'>
            <div className='slider w-[15%]'>
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
            </div>
            
        </div>
        </>
    );
};

export default ProductZoom;