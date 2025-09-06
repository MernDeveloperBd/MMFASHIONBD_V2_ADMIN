
import UploadBox from '../../Components/UploadBox/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { Button } from '@mui/material';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { deleteImages,  editData,  fetchDataFromApi } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';

const EditHomeSlide = () => {
    const { openAlertBox,isOpenFullScreenPanel, setIsOpenFullScreenPanel } = useContext(MyContext)
        const [previews, setPriviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [formFields, setFormFields] = useState({
        name: "",
        shortDescription: "",
        images: []
    });

useEffect(() => {
    const id = isOpenFullScreenPanel?.id;
    if (!id) return;
    fetchDataFromApi(`/api/homeSlides/${id}`).then((res) => {
        console.log(res);
        
        if (res?.data) {
            setFormFields({
                name: res?.slide?.name || "",
                shortDescription: res?.slide?.shortDescription || "",
                images: res.slide.images || []
            });
            setPriviews(res.slide.images || []);
        }
    });
}, [isOpenFullScreenPanel]);


    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormFields(() => {
            return {
                ...formFields,
                [name]: value
            }
        })
        formFields.images=previews
    };

    const setPriviewsFun = (previewsArr) => {
        setPriviews(previewsArr);
        formFields.images=previews
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
        editData(`/api/homeSlides/${isOpenFullScreenPanel?.id}`, formFields).then((res) => {                     
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
                            <h3 className="text-[16px] font-[600] mb-1">Home Slides Name</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " defaultValue={formFields?.slide?.name}  name='name'
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 mb-3">
                        <div className="col w-[25%]">
                            <h3 className="text-[16px] font-[600] mb-1">Home Slides Short Description</h3>
                            <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " defaultValue={formFields?.slide?.shortDescription}  name='name'
                                onChange={onChangeInput}
                            />
                        </div>
                    </div>
                    <h3 className="text-[16px] font-[600] mb-1">Home Slides Image</h3>
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

                        <UploadBox multiple={true} name="images" url="/api/category/uploadImages" setPriviews={setPriviewsFun} />
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

export default EditHomeSlide;