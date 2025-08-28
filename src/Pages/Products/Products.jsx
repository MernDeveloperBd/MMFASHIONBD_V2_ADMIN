import { Button, Select, MenuItem, Checkbox, Tooltip, Pagination } from "@mui/material";
import { CgExport } from "react-icons/cg";
import { FiEye } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import SearchBox from "../../Components/SearchBox/SearchBox";
import { MyContext } from "../../App";
import { deleteData, deleteMultipleData, fetchDataFromApi } from "../../utils/api";
import Loading from "../../Components/Loading/Loading";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Products = () => {
    const { setIsOpenFullScreenPanel, isOpenFullScreenPanel, openAlertBox, cateData } = useContext(MyContext)
    const [productCat, setProductCat] = useState('');
    const [productSubCat, setProductSubCat] = useState('');
    const [productThirdLavelCat, setProductThirdLavelCat] = useState('');
    const [page, setPage] = useState(1); // mui pagination starts from 1
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [productData, setProductData] = useState([]);
    const [sortedIds, setSortedIds] = useState([])
    const[isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getProducts()
    }, [isOpenFullScreenPanel]);

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        //update all items checked status
        const updatedItems = productData?.map((item) => ({
            ...item,
            checked: isChecked
        }))
        setProductData(updatedItems);
        console.log(updatedItems);

        //update the sorted ids state
        if (isChecked) {
            const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b)
            console.log(ids);
            setSortedIds(ids)
        } else {
            setSortedIds([])
        }
    }

    const handleCheckboxChange = (e, id, index) => {

        const updatedItems = productData?.map((item) =>
            item?._id === id ? { ...item, checked: !item.checked } : item
        );
        setProductData(updatedItems)

        //update the sorted ids state
        const selectedIds = updatedItems
            .filter((item) => item.checked)
            .map((item) => item._id)
            .sort((a, b) => a - b)
        setSortedIds(selectedIds)
        console.log(selectedIds);

    }
    const getProducts = async () => {
        setIsLoading(true)
        fetchDataFromApi('/api/product/getAllProducts').then((res) => {
            let productArr = []
            if (res?.error === false) {
                for (let i = 0; i < res?.products?.length; i++) {
                    productArr[i] = res?.products[i];
                    productArr[i].checked = false
                }
                setTimeout(() =>{
                    setProductData(productArr)
                    setIsLoading(false)
                }, 500)

            }
        })
    };

    const handleChangeProductCat = (event) => {
        setProductCat(event.target.value);
        setProductSubCat('')
        setProductThirdLavelCat('')
        setIsLoading(true)
        fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.products)
                setTimeout(() =>{
                    setIsLoading(false)
                }, 500)
            }
        })
    };

    const handleChangeProductSubCat = (event) => {
        setProductSubCat(event.target.value);
        setProductCat('');
        setProductThirdLavelCat('')
          setIsLoading(true)
        fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.products)
                setTimeout(() =>{
                    setIsLoading(false)
                }, 500)
            }
        })
    };

    const handleChangeProductThirdLavelCat = (event) => {
        setProductThirdLavelCat(event.target.value);
        setProductCat('');
        setProductSubCat('');
          setIsLoading(true)
        fetchDataFromApi(`/api/product/getAllProductsByThirdSubCatId/${event.target.value}`).then((res) => {
            if (res?.error === false) {
                setProductData(res?.products)
                setTimeout(() =>{
                    setIsLoading(false)
                }, 500)
            }
        })
    };


    const deleteProduct = (id) => {
        deleteData(`/api/product/${id}`).then(() => {
            getProducts()
            openAlertBox("success", "Product deleted successfully done")
        })
    };

    //deleteMultiple products
    const deleteMultipleProducts = () => {
        if (sortedIds?.length === 0) {
            openAlertBox('error', "Please select items to delete")
            return;
        }

        try {
            deleteMultipleData(`/api/product/deleteMultiple`, {
                data: { ids: sortedIds },
            }).then((res) => {
                getProducts()
                openAlertBox("success", "Products Deleted")

            })
        } catch (error) {
            openAlertBox("error", `error deleting data ${error}`)
        }
    }

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // reset page যখন rowsPerPage change হবে
    };

    // pagination calculation
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedProducts = productData.slice(startIndex, endIndex);
    // Loading check

    return (
        <>
            <div className="">
                <div className="card my-0 shadow-md sm:rounded-lg bg-white">
                    <div className="col1 flex items-center px-5 py-4 ">
                        <h3 className="text-[20px] font-[700]">Products {productData?.length}</h3>
                        <div className="col ml-auto w-[30%] flex items-center gap-2 justify-end ">
                            {
                                sortedIds?.length !== 0 && <Button className="!bg-red-600 !text-white !font-[600] flex items-center gap-1" onClick={deleteMultipleProducts}>Delete
                                </Button>
                            }
                            <Button className="!bg-green-600 !text-white !font-[600] flex items-center gap-1">
                                <CgExport className="text-[18px]" />Export
                            </Button>
                            <Button
                                onClick={() => setIsOpenFullScreenPanel({ open: true, model: 'Add Product' })}
                                className="btn-blue btn-sm !font-[600]"
                            >
                                Add Product
                            </Button>
                        </div>
                    </div>

                    {/* filter + search */}
                    <div className="flex items-center gap-2 w-full px-5 justify-between">
                        <div className="col w-[15%]">
                            <h4 className="text-[13px] font-[600] mb-3">Category By</h4>
                            {
                                cateData?.length !== 0 && <Select
                                    style={{ zoom: "80%" }}
                                    id='productCatDrop'
                                    size='small'
                                    className='w-full'
                                    value={productCat}
                                    label="Category"
                                    onChange={handleChangeProductCat}
                                >
                                    {
                                        cateData?.map((cat, index) => {
                                            return (
                                                <MenuItem key={index} value={cat?._id}>{cat?.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className="col w-[15%]">
                            <h4 className="text-[13px] font-[600] mb-3">Sub Category By</h4>
                            {
                                cateData?.length !== 0 && <Select
                                    style={{ zoom: '80%' }}
                                    id='productSubCatDrop'
                                    size='small'
                                    className='w-full'
                                    value={productSubCat}
                                    label="Sub Category"
                                    onChange={handleChangeProductSubCat}
                                >
                                    {
                                        cateData?.map((cat) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                                                    return (
                                                        <MenuItem key={index_} value={subCat?._id}>{subCat?.name}</MenuItem>
                                                    )
                                                })


                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className="col w-[15%]">
                            <h4 className="text-[13px] font-[600] mb-3">Third Category By</h4>
                            {
                                cateData?.length !== 0 && <Select
                                    style={{ zoom: '80%' }}
                                    id='productCatDrop'
                                    size='small'
                                    className='w-full'
                                    value={productThirdLavelCat}
                                    label="Third Lavel Category"
                                    onChange={handleChangeProductThirdLavelCat}
                                >
                                    {
                                        cateData?.map((cat) => {
                                            return (
                                                cat?.children?.length !== 0 && cat?.children?.map((subCat) => {
                                                    return (
                                                        subCat?.children?.length !== 0 && subCat?.children?.map((thirdLabelCat, index__) => {
                                                            return (
                                                                <MenuItem key={index__}
                                                                    value={thirdLabelCat?._id}
                                                                >{thirdLabelCat?.name}</MenuItem>
                                                            )
                                                        })

                                                    )
                                                })


                                            )
                                        })
                                    }
                                </Select>
                            }
                        </div>
                        <div className="col w-[20%] ml-auto">
                            <SearchBox />
                        </div>
                    </div>

                    {/* table */}
                    {
                        isLoading === false && paginatedProducts.length !== 0 ?  <div className="relative overflow-x-auto mt-5 mb-5 ">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-100 uppercase bg-blue-600 dark:bg-gray-700 mb-2">
                                <tr>
                                    <th className="px-6 py-2">
                                        <Checkbox {...label} size="small" className="!text-white"
                                            onChange={handleSelectAll}
                                            checked={productData?.length > 0 ? productData.every((item) => item.checked) : false}
                                        />
                                    </th>
                                    <th className="px-3 py-2">Product</th>
                                    <th className="px-3 py-2">Category</th>
                                    <th className="px-3 py-2">Sub Category</th>
                                    <th className="px-3 py-2">Brand</th>
                                    <th className="px-3 py-2">Price</th>
                                    <th className="px-3 py-2">Sales</th>
                                    <th className="px-3 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>                                
                                      {paginatedProducts.length > 0 &&
                                        paginatedProducts.slice().reverse().map((product, index) => (
                                            <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                                                <td className="px-6 py-2">
                                                    <Checkbox {...label} size="small"
                                                        checked={product?.checked === true ? true : false}
                                                        onChange={(e) => handleCheckboxChange(e, product._id, index)}
                                                    />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex items-center gap-4 w-[320px]">
                                                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                                                            <Link to={`/product/${product._id}`}>
                                                                <img src={product?.images[0]} alt="product image" className="w-full group-hover:scale-105 transition-all" />
                                                            </Link>
                                                        </div>
                                                        <div className="info w-[75%]">
                                                            <h3 className="font-[600] text-[14px] leading-4 hover:text-primary">
                                                                <Link to={`/product/${product._id}`}>{product?.name}</Link>
                                                            </h3>
                                                            <span className="text-[12px]">{product?.brand}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2">{product?.catName}</td>
                                                <td className="px-3 py-2">{product?.subCat}</td>
                                                <td className="px-3 py-2">Suti</td>
                                                <td className="px-3 py-2">
                                                    <div className="flex flex-col gap-2">
                                                        <span className="oldPrice line-through text-[12px] font-[500] text-red-600">
                                                            TK<span>{product?.oldPrice}</span>
                                                        </span>
                                                        <span className="price text-blue-500 text-[14px] font-[500]">
                                                            TK<span> {product?.price}</span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2">
                                                    <p className="text-[14px] ">
                                                        <span className="font-[600]">{product?.sale}</span> {product?.sale > 1 ? "Sells" : "Sell"}
                                                    </p>
                                                    <ProgressBar value={40} type={"warning"} />
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <Tooltip title="Edit">
                                                            <Button className="!w-[35px] !h-[35px] !min-w-[35px]"
                                                                onClick={() => setIsOpenFullScreenPanel({ open: true, model: 'Edit Product', id: product?._id })} >
                                                                <AiOutlineEdit className="text-[22px]" />
                                                            </Button>
                                                        </Tooltip>
                                                        <Tooltip title="View">
                                                            <Link to={`/product/${product?._id}`}>
                                                                <Button className="!w-[35px] !h-[35px] !min-w-[35px]">
                                                                    <FiEye className="text-[22px]" />
                                                                </Button>
                                                            </Link>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <Button onClick={() => deleteProduct(product?._id)} className="!w-[35px] !h-[35px] !min-w-[35px]">
                                                                <MdDeleteOutline className="text-[#8b1c1c] text-[22px]" />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }                                

                            </tbody>
                        </table>
                        {/* pagination */}
                        <div className="py-4 px-4 flex items-center justify-between">
                            {/* Rows per page dropdown */}
                            <div className="flex items-center gap-4">
                                {/* Rows per page select */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">Rows per page:</span>
                                    <Select
                                        size="small"
                                        value={rowsPerPage}
                                        onChange={handleChangeRowsPerPage}
                                    >
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                        <MenuItem value={50}>50</MenuItem>
                                    </Select>
                                </div>

                                {/* Showing X–Y of Z */}
                                <span className="text-sm text-gray-600">
                                    {`Showing ${(page - 1) * rowsPerPage + 1}–${Math.min(
                                        page * rowsPerPage,
                                        productData.length
                                    )} of ${productData.length} products`}
                                </span>
                            </div>


                            {/* Pagination */}
                            <Pagination
                                count={Math.ceil(productData.length / rowsPerPage)}
                                page={page}
                                onChange={handleChangePage}
                                color="primary"
                                siblingCount={1}   // current page এর পাশে কয়টা দেখাবে
                                boundaryCount={1}  // শুরু আর শেষে কয়টা দেখাবে
                            />
                        </div>
                    </div> :<div className="flex h-[50vh] items-center justify-center w-full mx-auto"><Loading /> </div>
                    }
                  


                </div>
            </div>
        </>
    );
};

export default Products;
