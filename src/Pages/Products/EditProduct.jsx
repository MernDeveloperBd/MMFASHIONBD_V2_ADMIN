import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import UploadBox from '../../Components/UploadBox/UploadBox';
import { IoMdClose } from 'react-icons/io';
import { Button, CircularProgress } from '@mui/material';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from '../../App';
import { deleteImages, editData, fetchDataFromApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const MenuProps = { PaperProps: { style: { width: 250 } } };

const EditProduct = () => {
  const { cateData, setIsOpenFullScreenPanel, isOpenFullScreenPanel, openAlertBox } = useContext(MyContext);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    brand: "",
    shopName: "",
    facebookURL: "",
    price: "",
    oldPrice: "",
    resellingPrice: "",
    catId: "",
    catName: "",
    subCatId: "",
    subCat: "",
    thirdSubCatId: "",
    thirdSubCat: "",
    countInStock: "",
    rating: 0,
    isFeatured: false,
    productSize: [],
    color: [],
    productWeight: "",
    images: [],
    location: "",
    dateCreated: "",
  });

  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [productFeatured, setProductFeatured] = useState(false);
  const [productSize, setProductSize] = useState([]);
  const [color, setColor] = useState([]);
  const [productWeight, setProductWeight] = useState("");
  const [productSizeData, setProductSizeData] = useState([]);
  const [colorsData, setColorsData] = useState([]);

  // Load product
  useEffect(() => {
    if (!isOpenFullScreenPanel?.id) return;

    fetchDataFromApi(`/api/product/productColor/get`).then((res) => {
      if (res?.error === false) {
        setColorsData(res?.data)
      }
    })
    fetchDataFromApi(`/api/product/productSize/get`).then((res) => {
      if (res?.error === false) {
        setProductSizeData(res?.data)
      }
    })
    fetchDataFromApi(`/api/product/${isOpenFullScreenPanel.id}`).then((res) => {
      const p = res?.product;
      if (!p) return;

      setFormFields({
        name: p.name || "",
        description: p.description || "",
        brand: p.brand || "",
        shopName: p.shopName || "",
        facebookURL: p.facebookURL || "",
        price: p.price || "",
        oldPrice: p.oldPrice || "",
        resellingPrice: p.resellingPrice || "",
        catId: p.catId || "",
        catName: p.catName || "",
        subCatId: p.subCatId || "",
        subCat: p.subCat || "",
        thirdSubCatId: p.thirdSubCatId || "",
        thirdSubCat: p.thirdSubCat || "",
        countInStock: p.countInStock || "",
        rating: p.rating || 0,
        isFeatured: p.isFeatured || false,
        productSize: Array.isArray(p.size) ? p.size : [],
        color: Array.isArray(p.color) ? p.color : [],
        productWeight: p.productWeight || "",
        images: p.images || [],
        location: p.location || "",
        dateCreated: p.dateCreated || "",
      });

      setProductCat(p.catId || "");
      setProductSubCat(p.subCatId || "");
      setProductThirdLavelCat(p.thirdSubCatId || "");
      setProductFeatured(p.isFeatured || false);
      setProductSize(Array.isArray(p.size) ? p.size : []);
      setColor(Array.isArray(p.color) ? p.color : []);
      setProductWeight(p.productWeight || "");
      setPreviews(p.images || []);
    });
  }, [isOpenFullScreenPanel]);

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormFields(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectChange = (field, value) => {
    const valArray = typeof value === 'string' ? value.split(',') : value;
    setFormFields(prev => ({ ...prev, [field]: valArray }));
  };

  const handleRatingChange = (e, newValue) => {
    setFormFields(prev => ({ ...prev, rating: newValue }));
  };

  const handleImageChange = (imagesArr) => {
    setPreviews(imagesArr);
    setFormFields(prev => ({ ...prev, images: imagesArr }));
  };

  const handleRemoveImage = (image, idx) => {
    deleteImages(`/api/category/deleteImage?img=${image}`).then(() => {
      const newImages = previews.filter((_, i) => i !== idx);
      setPreviews(newImages);
      setFormFields(prev => ({ ...prev, images: newImages }));
    });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = ["name", "description", "price", "catId", "countInStock", "rating"];
    for (let field of requiredFields) {
      if (!formFields[field]) {
        openAlertBox("error", `Please fill ${field}`);
        return;
      }
    }

    setIsLoading(true);
    editData(`/api/product/updateProduct/${isOpenFullScreenPanel.id}`, formFields).then(res => {
      setIsLoading(false);
      if (res?.error !== false) {
        setIsOpenFullScreenPanel({ open: false });
        navigate("/products");
        openAlertBox("success", "Product update successfully");
      } else {
        openAlertBox("error", "Product update failed");
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="max-h-[75vh] overflow-y-scroll pr-2 mb-3">
          {/* Title */}
          <div className="mb-3">
            <h3>Title</h3>
            <input type="text" name="name" value={formFields.name} onChange={handleInputChange} className="w-full h-10 border p-2" />
          </div>

          {/* Description */}
          <div className="mb-3">
            <h3>Description</h3>
            <textarea name="description" value={formFields.description} onChange={handleInputChange} className="w-full border p-2" rows={4} />
          </div>

          {/* Category / Sub / Child */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            <Select value={productCat} onChange={e => { setProductCat(e.target.value); handleSelectChange("catId", e.target.value); }}>
              {cateData?.map(cat => <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>)}
            </Select>
            <Select value={productSubCat} onChange={e => { setProductSubCat(e.target.value); handleSelectChange("subCatId", e.target.value); }}>
              {cateData?.flatMap(c => c.children || []).map(sub => <MenuItem key={sub._id} value={sub._id}>{sub.name}</MenuItem>)}
            </Select>
            <Select value={productThirdLavelCat} onChange={e => { setProductThirdLavelCat(e.target.value); handleSelectChange("thirdSubCatId", e.target.value); }}>
              {cateData?.flatMap(c => c.children || []).flatMap(s => s.children || []).map(third => <MenuItem key={third._id} value={third._id}>{third.name}</MenuItem>)}
            </Select>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2"> Price</h3>
              <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='price' value={formFields.price} onChange={handleInputChange} />
            </div>
          </div>
          {/* Old Price , Price,Quantity, Brand */}
          <div className="grid grid-cols-4 mb-3 gap-3">
            {/* Old Price */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2"> Old Price</h3>
              <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='oldPrice' value={formFields.oldPrice} onChange={handleInputChange} />
            </div>
            {/* Reselling Price */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">Reselling Price</h3>
              <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield]" name='resellingPrice' value={formFields.resellingPrice} onChange={handleInputChange} />
            </div>

            {/* Quantity */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">Quantity</h3>
              <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='countInStock' value={formFields.countInStock} onChange={handleInputChange} />
            </div>
            {/* Brand */}
            <div className="grid grid-cols-1 mb-3">
              <div className="col">
                <h3 className="text-[14px] font-[500] mb-1">Brand</h3>
                <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm " name='brand' value={formFields.brand} onChange={handleInputChange} />
              </div>
            </div>

          </div>


          <div className="grid grid-cols-4 gap-3 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">ShopName</h3>
              <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='shopName' value={formFields.shopName} onChange={handleInputChange} />
            </div>
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">WhatsAppNum</h3>
              <input type="number" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='whatsApp' value={formFields.whatsApp} onChange={handleInputChange} />
            </div>
            {/* Popular */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">Is Featured</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size='small'
                className='w-full'
                value={productFeatured}
                label="Product Featured"
                onChange={e => { setProductFeatured(e.target.value); handleSelectChange("isFeatured", e.target.value); }}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
            {/* Color */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">Color</h3>
              {colorsData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="color"
                  name="color"
                  size="small"
                  className="w-full"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                    handleMultiSelectChange("color", e.target.value);
                  }}
                  MenuProps={MenuProps}
                >
                  {colorsData?.map((item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>
          </div>

          {/* Color / Weight / Size / FacebookURL */}
          <div className="grid grid-cols-4 gap-3 mb-3">
            {/* Weight */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">Product Weight</h3>
              <Select
                labelId="demo-simple-select-label"
                id="productWeight"
                size='small'
                className='w-full'
                value={productWeight}
                label="Product weight"
                onChange={e => { setProductWeight(e.target.value); handleSelectChange("productWeight", e.target.value); }}
              >
                <MenuItem value={500}>500 gm</MenuItem>
                <MenuItem value={700}>700 gm</MenuItem>
                <MenuItem value={1000}>1 kg</MenuItem>
              </Select>
            </div>
            {/* Size */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">Size</h3>
              {productSizeData?.length !== 0 && (
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productSize"
                  size="small"
                  className="w-full"
                  value={productSize}
                  onChange={(e) => {
                    setProductSize(e.target.value);
                    handleMultiSelectChange("productSize", e.target.value);
                  }}
                  MenuProps={MenuProps}
                >
                  {productSizeData?.map((item, index) => (
                    <MenuItem key={index} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>
            {/* facebookUrl */}
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-2">FacebookURL</h3>
              <input type="text" className="w-full h-[40px] border border-[rgba(0,0,0,0.1)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] p-3 rounded-sm text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name='facebookURL' value={formFields.facebookURL} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <h3>Rating</h3>
              <Rating value={formFields.rating} onChange={handleRatingChange} />
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-9 gap-3 mb-3">
            {previews.map((img, idx) => (
              <div key={idx} className="relative">
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-700 text-white flex items-center justify-center cursor-pointer" onClick={() => handleRemoveImage(img, idx)}>x</span>
                <img src={img} className="w-full h-24 object-cover" />
              </div>
            ))}
            <UploadBox multiple={true} name="images" url="/api/product/uploadImages" setPriviews={handleImageChange} />
          </div>

        </div>

        <div className='w-[250px]'>
          <Button type='submit' className='btn-blue flex items-center w-full justify-center gap-2 font-[600]'>
            {isLoading ? <CircularProgress color="inherit" /> : <><FaCloudUploadAlt /> Publish</>}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditProduct;
