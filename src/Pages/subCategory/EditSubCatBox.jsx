import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import { MyContext } from '../../App';

const EditSubCatBox = (props) => {
    const context = useContext(MyContext)
    const [editMode, setEditMode] = useState(false)
    return (
        <div>
            <form className='w-100 flex items-center gap-3 p-0 px-4'>
                {
                    editMode === true &&
                    <>
                        <div className='flex items-center justify-between py-2 gap-4'>
                            <div className='w-[150px]'>

                            </div>
                        </div>
                    </>
                }

                {
                    editMode === false &&
                    <>
                        <span className='font-[500] text-[14px]'>{props?.name} </span>
                        <div className='flex items-center ml-auto gap-2'>
                            <Button className="!min-w-[35px] !w-[35px] !h-[35px] !ronded-full !text-black !ml-auto" onClick={() => {
                                setEditMode(true)
                            }}>
                                <MdOutlineModeEdit className='text-xl' />
                            </Button>
                            <Button className="!min-w-[35px] !w-[35px] !h-[35px] !ronded-full !text-black !ml-auto" >
                                <MdDeleteOutline className='text-xl text-red-600' />
                            </Button>
                        </div>
                    </>
                }

            </form>
        </div>
    );
};

export default EditSubCatBox;