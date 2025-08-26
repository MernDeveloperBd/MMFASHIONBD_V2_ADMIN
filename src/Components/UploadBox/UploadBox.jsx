import { useContext, useState } from "react";
import { FaImages } from "react-icons/fa6";
import { uploadImages } from "../../utils/api";
import { MyContext } from "../../App";
import CircularProgress from '@mui/material/CircularProgress';

const UploadBox = (props) => {
    const [previews, setPriviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const { openAlertBox } = useContext(MyContext)

    let selectedImages = [];
    const formData = new FormData();

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            setPriviews([]);
            const files = e.target.files;
            setUploading(true);

            for (var i = 0; i < files.length; i++) {
                if (files[i] && (files[i].type === "image/jpeg" || files[i].type === "image/jpg" || files[i].type === "image/png" || files[i].type === "image/webp")
                ) {
                    const file = files[i];
                    selectedImages.push(file);
                    formData.append(props?.name, file);

                } else {
                    openAlertBox("error", "Please select a valid jpeg or jpg or png or webp file")
                    setUploading(false);
                    return false
                }
            }
            uploadImages(apiEndPoint, formData).then((res) => {
                setUploading(false);
                props.setPriviews(res?.data?.images)
               
            })
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="uploadBox p-2 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.2)] h-[120px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative">

            {
                uploading === true ? <CircularProgress /> :
                    <>
                        <FaImages className="text-[40px] opacity-35  pointer-events-none" />
                        <h4 className="text-[14px]  pointer-events-none">Image Upload</h4>
                        <input type="file"
                            accept="image/*"
                            multiple={props.multiple !== undefined ? props.multiple : false}
                            className="absolute top-0 left-0 w-full h-full z-50 opacity-0"
                            onChange={(e) => onChangeFile(e, props?.url)}
                            name="images"
                        />
                    </>
            }

        </div>
    );
};

export default UploadBox;