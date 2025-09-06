
import UploadBox from '../../Components/UploadBox/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { Button, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useContext, useState } from 'react';
import { MyContext } from '../../App';
import { deleteImages, postData } from '../../utils/api';


const AddHomeSlide = () => {
    const {openAlertBox, setIsOpenFullScreenPanel} = useContext(MyContext)
    const [previews, setPriviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [formFields, setFormFields] = useState({
        name: "",
        shortDescription: "",
        images: []

    });
    const setPriviewsFun = (previewsArr) => {
        setPriviews(previewsArr);
        setFormFields({
            ...formFields,
            images: previewsArr
        });
    };
    const removeImg = (image, index) => {
        var imageArr = []
        imageArr = previews
        deleteImages(`/api/homeSlides/deleteImage?img=${image}`).then(() => {
            previews.splice(index, 1)
            setPriviews([])
            setTimeout(() => {
                setPriviews(imageArr)
                setFormFields({
                    ...formFields,
                    images: imageArr
                });
            }, 50)
        })
    };
       const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
    };
     const handleSubmit = (e) => {
            e.preventDefault()
            setIsLoading(true)
            if (formFields.name === "") {
                openAlertBox('error', "Please enter Category Name")
                setIsLoading(false)
                return false;
            }
            if (previews.length === 0) {
                openAlertBox('error', "Please Select an image")
                setIsLoading(false)
                return false;
            }
            postData("/api/homeSlides/add", formFields).then((res) => {
                 console.log(res);                     
                setTimeout(() => {
                    setIsLoading(false)
                    setIsOpenFullScreenPanel({ open: false })
                }, 2500)
                  
            })
    
        }
    return (
        <section className='p-5 bg-gray-50'>
                    <form className='form py-3 p-8' onSubmit={handleSubmit}>
                        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4 pb-4">
                            <div className="grid grid-cols-1 mb-3">
                                <div className="col w-[25%]">
                                    <h3 className="text-[16px] font-[600] mb-1">Slider Title</h3>
                                    <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='name'
                                        onChange={onChangeInput}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 mb-3">
                                <div className="col w-[25%]">
                                    <h3 className="text-[16px] font-[600] mb-1">Slider Short description</h3>
                                    <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='shortDescription'
                                        onChange={onChangeInput}
                                    />
                                </div>
                            </div>
                            <h3 className="text-[16px] font-[600] mb-1">Slider Image</h3>
                            <div className="grid grid-cols-9 gap-3">
                                {
                                    previews?.length !== 0 && previews?.map((image, index) => {
                                        return (
                                            <div key={index} className="uploadBoxWrapper relative">
                                                <span className='absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] z-50 flex items-center justify-center cursor-pointer' onClick={() => removeImg(image, index)}><IoMdClose className='text-white' /></span>
        
                                                <div className="uploadBox rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[120px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">
                                                    <img src={image} alt={"Image"} className='w-full h-full object-cover' />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
        
                                <UploadBox multiple={false} name="images" url="/api/homeSlides/uploadImages" setPriviews={setPriviewsFun} />
                            </div>
                        </div>
                        <hr className='mb-4 ' />
                        <div className='w-[250px]'>
                            <Button type='submit' className=' btn-blue flex items-center w-full justify-center gap-2 font-[600]'>
                                {
                                    isLoading === true ? <CircularProgress className='reg_loading' color="inherit" /> : <> <FaCloudUploadAlt className='text-[20px] ' />Publish and View</>
                                }
                            </Button>
                        </div>
                    </form>
        
                </section>
    );
};

export default AddHomeSlide;