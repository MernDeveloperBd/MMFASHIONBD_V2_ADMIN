import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { fetchDataFromApi } from "../../utils/api";
import { useParams } from "react-router-dom";
import ProductDetailsRight from "./ProductDetailsRight";
import ReviewSection from "../../Components/submitReview/ReviewSection";
import Loading from "../../Components/Loading/Loading";


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [slideIndex, setSlideIndex] = useState(0);

    const zoomSliderBig = useRef(null);
    const zoomSliderSml = useRef(null);

    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomStyle, setZoomStyle] = useState({ transform: "scale(1)" });

    // Fetch product data
    useEffect(() => {
        fetchDataFromApi(`/api/product/${id}`).then((res) => {
            if (res?.error === false) setProduct(res.product);
        });
    }, [id]);

    if (!product) return <Loading/>; // Loading check

    const hasManyThumbs = product?.images?.length > 4;

    const goto = (index) => {
        setSlideIndex(index);
        zoomSliderSml.current?.swiper?.slideTo(index);
        zoomSliderBig.current?.swiper?.slideTo(index);
        setZoomStyle({ transform: "scale(1)" }); // slide change হলে zoom reset
        setIsZoomed(false);
    };

    // Mouse hover zoom
    const handleMouseMove = (e) => {
        if (isZoomed) return; // button zoom overrides hover
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomStyle({
            transform: "scale(1.8)",
            transformOrigin: `${x}% ${y}%`,
        });
    };

    const handleMouseLeave = () => {
        if (!isZoomed) setZoomStyle({ transform: "scale(1)" });
    };

    const toggleZoom = () => {
        if (isZoomed) {
            setIsZoomed(false);
            setZoomStyle({ transform: "scale(1)" });
        } else {
            setIsZoomed(true);
            setZoomStyle({ transform: "scale(2)", transformOrigin: "center center" });
        }
    };

    return (
        <>
            <div className="productDetails flex flex-col md:flex-row gap-5 md:gap-10">
                {/* Left Thumbnails */}
                <div className="w-[45%]">
                    <div className="flex gap-3">
                        <div className="slider w-[15%] relative">
                            <Swiper
                                ref={zoomSliderSml}
                                direction="vertical"
                                navigation={
                                    hasManyThumbs
                                        ? { nextEl: ".thumb-next", prevEl: ".thumb-prev" }
                                        : false
                                }
                                slidesPerView={Math.min(4, product?.images?.length)}
                                spaceBetween={10}
                                modules={[Navigation]}
                                className="zoomProductSliderThumbs h-[500px] overflow-hidden"
                            >
                                {product?.images?.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <div
                                            className={`rounded-md overflow-hidden cursor-pointer border-2 ${slideIndex === i
                                                ? "border-blue-500 opacity-100"
                                                : "border-transparent opacity-40"
                                                }`}
                                            onClick={() => goto(i)}
                                        >
                                            <img
                                                src={img}
                                                alt={`thumb-${i}`}
                                                className="w-full h-[100px] object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {hasManyThumbs && (
                                <>
                                    <button className="thumb-prev absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-black/55 text-white p-2 rounded-md hover:bg-black/70">
                                        <FiChevronUp size={18} />
                                    </button>
                                    <button className="thumb-next absolute bottom-0 left-1/2 -translate-x-1/2 z-10 bg-black/55 text-white p-2 rounded-md hover:bg-black/70">
                                        <FiChevronDown size={18} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Main Image */}
                        <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md relative group">
                            <Swiper
                                ref={zoomSliderBig}
                                slidesPerView={1}
                                spaceBetween={0}
                                navigation={false}
                                className="zoomProductSlider h-[500px] overflow-hidden"
                                onSlideChange={(swiper) => {
                                    setSlideIndex(swiper.activeIndex);
                                    setZoomStyle({ transform: "scale(1)" });
                                    setIsZoomed(false);
                                }}
                            >
                                {product?.images?.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <div
                                            className="w-full h-[500px] overflow-hidden rounded-md relative"
                                            onMouseMove={handleMouseMove}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <img
                                                src={img}
                                                alt={`main-${i}`}
                                                className="w-full h-full object-cover transition-transform duration-200 ease-in-out select-none"
                                                draggable={false}
                                                style={slideIndex === i ? zoomStyle : { transform: "scale(1)" }}
                                            />

                                            {/* Zoom button */}
                                            <button
                                                onClick={toggleZoom}
                                                className="absolute top-3 right-3 bg-black/55 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition pointer-events-auto"
                                            >
                                                {isZoomed ? <AiOutlineZoomOut size={22} /> : <AiOutlineZoomIn size={22} />}
                                            </button>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
               
                {/* Product Info */}
                <div className="w-[55%]">
                    <ProductDetailsRight product={product} />
                </div>
            </div>
            {/* product description */}

            <div className="py-10">
                <h2 className="text-[25px] font-[500] mb-2">Product Description</h2>
                {
                    product?.description && (
                        <p className="w-[75%] whitespace-pre-line">
                            {product?.description}
                        </p>
                    )
                }
            </div>
            {/* Customer Review */}

            <div className="py-10">

                {/* Review Form */}
                <ReviewSection />
            </div>

        </>
    );
};

export default ProductDetails;
