import { useContext } from "react";
import { MyContext } from "../../App";
import AddProduct from "../../Pages/Products/AddProduct";
import AddHomeSlide from "../../Pages/HomeSliderBanners/AddHomeSlide";
import AddCategory from "../../Pages/Category/addCategory";
import EditCategory from "../../Pages/Category/EditCategory";
import AddSubCategory from "../../Pages/subCategory/AddSubCategory";
import AddAddress from "../../Pages/Address/AddAddress";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import Dialog from '@mui/material/Dialog';
const Transition = (function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = () => {
    const {isOpenFullScreenPanel, setIsOpenFullScreenPanel } = useContext(MyContext)
    return (
     <Dialog
          fullScreen
          open={isOpenFullScreenPanel.open}
          onClose={() => setIsOpenFullScreenPanel({ open: false })}
          slots={{
            transition: Transition,
          }}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setIsOpenFullScreenPanel({ open: false })}
                aria-label="close"
              >
                <IoCloseSharp />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {isOpenFullScreenPanel?.model}
              </Typography>
            </Toolbar>
          </AppBar>
          {isOpenFullScreenPanel?.model === 'Add Product' && <AddProduct />}
          {isOpenFullScreenPanel?.model === 'Add Home Slide' && <AddHomeSlide />}
          {isOpenFullScreenPanel?.model === 'Add Category' && <AddCategory />}
          {isOpenFullScreenPanel?.model === 'Edit Category' && <EditCategory />}
          {isOpenFullScreenPanel?.model === 'Add Sub Category' && <AddSubCategory />}
          {isOpenFullScreenPanel?.model === 'Add New Address' && <AddAddress />}
        </Dialog>
    );
};

export default DialogBox;