
import UploadBox from '../../Components/UploadBox/UploadBox';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AddHomeSlide = () => {
    return (
        <section className='p-5 bg-gray-50'>
            <form className='form py-3 p-8'>
                <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4 pb-4">
                    <div className="grid grid-cols-9 gap-3">
                        <div className="uploadBoxWrapper relative">
                            <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] z-50 flex items-center justify-center cursor-pointer'><IoMdClose className='text-white' /></span>
                            <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[120px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                <LazyLoadImage
                                    className='w-full h-full object-cover'
                                    alt={"Image"}
                                    src={'https://i.ibb.co/7JMWmf1M/Print-Panjabi-03-kenakata-bazar-bd.jpg'}
                                />
                            </div>
                        </div>
                        <UploadBox multiple={true} />
                    </div>
                </div>
                <hr className='mb-4 '/>
                <Button type='button' className=' btn-blue flex items-center justify-center gap-2 '><FaCloudUploadAlt className='text-[20px]' />Publish and View</Button>
            </form>

        </section>
    );
};

export default AddHomeSlide;