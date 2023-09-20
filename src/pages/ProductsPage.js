import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// @mui
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Container, Stack, Typography, Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { getRequestHandler } from '../apiHandler/customApiHandler';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';



// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData]= useState([])
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // async function handleRouteAddProduct(){
  //   try {
  //     Navigate("/dahsboard/product")
  //     console.log("navigate",)
  //   } catch (error) {
  //     // Handle the error
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    async function getData(){
      const categoriesData= await getRequestHandler("https://marpapi.techanalyticaltd.com/product/?page=1&items=10");
       setData(categoriesData.data.allProducts)
    
      // console.log("categoriesData -----",categoriesData.data.allProducts    
      // );
    }
    
    
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title> Products | Admin dashboard </title>
      </Helmet>

      <Container>
      <Box sx={{display:"flex"}}>
          <ShoppingCartIcon sx={{height:36}}/>
          <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
          </Box>
        
        
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <Box>
          {/* <AddCircleIcon/> */}
          <Link style={{textDecoration:"none"}} to="/dashboard/product">
          <Button  sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, margin:1}}><AddIcon/>Add Product</Button>
          {/* <Typography sx={{color:"white",fontSize:"12px", textDecoration:"none", textAlign:"center"}}>+ Add Product </Typography> */}
          </Link>
        </Box>
       
        <ProductList products={data} />
        
        <ProductCartWidget />
      </Container>
    </>
  );
}
