import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { MyContext } from '../../App';
import { deleteData, editData } from '../../utils/api';

const EditSubCatBox = (props) => {
    const { openAlertBox, getCat } = useContext(MyContext)
    const [isLoading, setIsLoading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectVal, setSelectVal] = useState('')
    const [formFields, setFormFields] = useState({
        name: "",
        parentCatName: null,
        parentId: null
    });

    // props থেকে state এ সঠিকভাবে ডাটা সেট করবো
    useEffect(() => {
        setFormFields({
            name: props?.name || "",
            parentCatName: props?.selectedCatName || null,
            parentId: props?.selectedCat || null,
        })
        setSelectVal(props?.selectedCat || "")
    }, [props])

    const handleChange = (event) => {
        const selectedId = event.target.value
        setSelectVal(selectedId)

        // parentId এবং parentCatName আপডেট
        const selectedCat = props?.cateData?.find(cat => cat._id === selectedId)
        setFormFields(prev => ({
            ...prev,
            parentId: selectedId,
            parentCatName: selectedCat?.name || null
        }))
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target
        setFormFields(prev => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (formFields.name.trim() === "") {
        openAlertBox('error', "Please enter Sub Category Name")
        setIsLoading(false)
        return
    }

    try {
        const res = await editData(`/api/category/${props?.id}`, formFields)
        openAlertBox('success', res?.data?.message || "Category updated successfully")
        getCat()
        setEditMode(false) // edit মোড বন্ধ
    } catch (error) {
        openAlertBox('error', error?.response?.data?.message || "Something went wrong")
    } finally {
        setIsLoading(false)
    }
}

    const deleteCat = (id) => {
        deleteData(`/api/category/${id}`).then(() => {
            getCat()
        })
    }

    return (
        <div>
            <form className='w-100 flex items-center gap-3 p-0 px-4' onSubmit={handleSubmit}>
                {editMode ? (
                    <div className='flex items-center justify-between py-2 gap-4'>
                        <div className='flex gap-2'>
                            <Select
                                style={{ zoom: "75%" }}
                                className='w-full'
                                size='small'
                                value={selectVal}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'without label' }}
                            >
                                {props?.cateData?.length > 0 &&
                                    props?.cateData?.map((item, index) => (
                                        <MenuItem value={item?._id} key={index}>
                                            {item?.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                type="text"
                                className='w-full h-[30px] border border-black focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm'
                                name='name'
                                value={formFields?.name}
                                onChange={onChangeInput}
                            />
                            <div className='flex items-center ml-auto gap-3'>
                                <Button type="submit" className="!ml-auto !border-outline !bg-green-700 !btn-sm !text-white">
                                    {isLoading ? <CircularProgress color='inherit' size={20} /> : "Save"}
                                </Button>
                                <Button
                                    onClick={() => setEditMode(false)}
                                    className="!ml-auto !border-outline !bg-gray-700 !btn-sm !text-white"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <span className='font-[500] text-[14px]'>{props?.name}</span>
                        <div className='flex items-center ml-auto gap-2'>
                            <Button
                                className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                                onClick={() => setEditMode(true)}
                            >
                                <MdOutlineModeEdit className='text-xl' />
                            </Button>
                            <Button
                                onClick={() => deleteCat(props?.id)}
                                className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                            >
                                <MdDeleteOutline className='text-xl text-red-600' />
                            </Button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}

export default EditSubCatBox;
