import { Button, CircularProgress, Tooltip } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';

const AddSize = () => {
  const { openAlertBox } = useContext(MyContext);
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fetchDataFromApi(`/api/product/productSize/get`);
    if (res?.error === false) {
      setData(res?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name.trim()) {
      openAlertBox('error', 'Please enter product size');
      setIsLoading(false);
      return;
    }

    try {
      let res;
      if (!editId) {
        // 👉 Create
        res = await postData(`/api/product/productSize/create`, { name });
      } else {
        // 👉 Update
        res = await editData(`/api/product/productSize/${editId}`, { name });
        getData();
      }

      if (res?.error === false) {
        openAlertBox('success', res?.message);
        setName('');
        setEditId(null); // reset edit
        getData(); // reload list
      } else {
        openAlertBox('error', res?.message);
      }
    } catch (error) {
      openAlertBox('error', 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteData(`/api/product/productSize/${id}`);
    getData();
    openAlertBox('success', 'Product size deleted');
  };

  const handleEdit = async (id) => {
    const res = await fetchDataFromApi(`/api/product/productSize/${id}`);
    if (res?.error === false) {
      setName(res?.data?.name);
      setEditId(res?.data?._id);
    }
  };

  return (
    <>
      <div className="col1 flex items-center justify-between px-2 py-0 ">
        <h3 className="text-[20px] font-[700]">Add Product Sizes</h3>
      </div>

      {/* Form */}
      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white md:w-[65%]">
        <form className="form py-3 p-8 " onSubmit={handleSubmit}>
          <div className="col mb-4">
            <h3 className="text-[14px] font-[500] mb-1">Product sizes</h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm "
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="w-[250px]">
            <Button
              type="submit"
              className=" btn-blue flex items-center w-full justify-center gap-2 font-[600]"
            >
              {isLoading ? (
                <CircularProgress className="reg_loading" color="inherit" />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-[20px] " />
                  {editId ? 'Update Size' : 'Publish and View'}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white md:w-[65%]">
        <div className="relative overflow-x-auto mt-5 mb-5 px-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">
                  <input type="checkbox" />
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Product Size
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length !== 0 &&
                data?.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <td className="px-6 py-4">
                      <input type="checkbox" />
                    </td>
                    <td className="px-6 py-4 font-semibold">{item?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Tooltip title="Edit">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !bg-green-600 !text-white"
                            onClick={() => handleEdit(item?._id)}
                          >
                            <AiOutlineEdit className="text-[22px]" />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !bg-red-600 !text-white"
                            onClick={() => handleDelete(item?._id)}
                          >
                            <MdDeleteOutline className="text-[22px]" />
                          </Button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddSize;
