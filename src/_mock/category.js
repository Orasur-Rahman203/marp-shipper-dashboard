import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import { getRequestHandler, postRequestHandler } from "src/apiHandler/customApiHandler";
import CardMedia from '@mui/material/CardMedia';
// import picture from "../../assets/transparent.png"
import { useState, useEffect } from "react";
// eslint-disable-next-line import/no-unresolved
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from "@mui/material/Backdrop";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Accordin from "../components/orderSearch/orderSearch"
// eslint-disable-next-line import/no-unresolved
// import CategoryIcon from "../../assets/Category.svg";
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "52%",
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius:3,
  boxShadow: 24,
  p: 4,
};


const Category = () => {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState("");

// button toggle 



  // New category start from here 
  const [opens, setOpens] = useState(false);
  const handleOpen = () => setOpens(true);

  const handleNewCategory=()=>{
    setOpens(false);
    console.log(category);
    async function getData(){
      // const categoriesData= await getRequestHandler("https://marpapi.techanalyticaltd.com/category/category");
      // setData(categoriesData.data.categoryList)
      const data=await postRequestHandler("https://marpapi.techanalyticaltd.com/category" , category);
      console.log("data ", data);
    
      // console.log("categoriesData -----",typeof(categoriesData.data.categoryList[0]), categoriesData.data.categoryList[0]
      // );
    }
    getData();
  }
  // const handleClickCancel=()=>{
  //   setOpens(false)
  // }
  const handleClickedCategory=()=>{
    handleOpen();
  }
  const handleClose = () => setOpens(false);

// New category start from here 
const [open, setOpen] = useState(false);
const handleClickedSubcategory=()=>{
  setOpen(true);
}
 
const handleClickCreate=()=>{
  setOpen(false)
}
const handleSubcategory = () => setOpen(false);

// select menu item start from here
const [age, setAge] = React.useState('');
const handleChange = (event) => {
  setAge(event.target.value);
};

// Data coming from backend

// useEffect(() => {
//   async function getData(){
//     const categoriesData= await getRequestHandler("https://marpapi.techanalyticaltd.com/category/");
//     setData(categoriesData.data.categoryList)
  
//     // console.log("categoriesData -----",typeof(categoriesData.data.categoryList[0]), categoriesData.data.categoryList[0]
//     // );
//   }
//   getData();

// }, []);

// dummy json data testing 
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setData(response.data);
      console.log("data from api", data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);


const handleClickedEdit=(id)=>{
  console.log("edit button", id);
}
const handleClickedDelete=(id)=>{
  console.log("Delete button", id);
}
const handleClickedClosed=(id)=>{
  setMenu(!menu);
  console.log("Menu button handleClickedClosed", id);
}
const handleClickedOpen=(id)=>{
  setMenu(!menu)
  console.log("Menu button handleClickedOpen", id);
}


// subcategory item start from here

const [anchorEl, setAnchorEl] = React.useState(null);
const openSubCategory = Boolean(anchorEl);
const handleClickSC = (event) => {
  console.log("toggle button--");
  setAnchorEl(event.currentTarget);
};
// console.log("button clicked", menu);
const handleCloseSC = () => {
  setAnchorEl(null);
};



// subCategory item end from here

    return (
      <>
      <Helmet>
      <title> Category | admin dashboard </title>
    </Helmet>


       {/* subCategory item start from here */}

    <Box sx={{marginX:2}}> 
    <Box sx={{ flexGrow: 1  }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
        <Box sx={{display:"flex"}}>
        {/* <CardMedia
        component="img"
        alt="green iguana"
        height={"100%"}
        width={24}
        image="./../../assets/Category.svg"
      /> */}
      {/* <CategoryIcon/> */}
          <Typography variant='h4' sx={{padding:0}}>Category</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{textAlign:"end", alignSelf:"end"}}>
        <Button onClick={handleClickedCategory} sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }}}><AddIcon/>New Category</Button>
      <Button onClick={handleClickedSubcategory} sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, margin:1}}><AddIcon/>New Subcategory</Button>
        </Grid>
      
      </Grid>
    </Box>


    <Box sx={{ flexGrow: 1, padding:3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>  
        {
data.map((item)=>(
  <>
     <Card sx={{ width: "100%", height:{xs:"3%", sm:"4%"}, marginTop:3}}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="full"
        width="full"
        image="./../../assets/Rectangle 181.png"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:'50%',
   }}>
        <h6>
         {item.name}
        </h6>
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions sx={{display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height:'50%',
   }}>
       <Button onClick={()=>handleClickedEdit(item.id)}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={()=>handleClickedDelete(item.id)}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>


      <Button onClick={handleClickSC}
            size="small"
            sx={{ ml: 6 }}
            aria-controls={openSubCategory ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openSubCategory ? 'true' : undefined}>
              { menu ?
              <KeyboardArrowRightIcon  sx={{color:"#6610F2"}} onClick={()=>handleClickedClosed(item.id)}/>
              :
              <KeyboardArrowDownIcon  sx={{color:"#6610F2"}} onClick={()=>handleClickedOpen(item.id)}/>
              }</Button>
      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
  </>
))
}

{/* <Accordin/> */}

        </Grid>
        <Grid item xs={12} sm={5}>
          <Box 
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems="center"
                        justifyContent={'center'}
                        margin='auto'
                        maxWidth={540}
                        // marginTop={5}
                        //    padding={3}
                        borderRadius={2}
                        boxShadow={'5px 5px 10px #ccc'}
                        sx={{
                            ":hover": {
                                boxShadow: '10px 10px 20px #ccc'
                            }
                        }}
                    >
       <Typography sx={{ marginBottom:3}} variant='h4'>SubCategory</Typography>
          <Card sx={{ width: "96%", height:{xs:40, marginBottom:8}}}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="full"
        width="full"
        image="./../../assets/Rectangle 181.png"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:"40%",
   }}>
        <h6>
         Name
        </h6>
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions sx={{display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height:"40%",
   }}>
       <Button onClick={handleClickedEdit}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>

      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
          <Card sx={{ width: "96%", height:{xs:40}, marginBottom:1}}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="full"
        width="full"
        image="./../../assets/Rectangle 181.png"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:"40%",
   }}>
        <h6>
         Name
        </h6>
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions sx={{display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height:"40%",
   }}>
       <Button onClick={handleClickedEdit}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>

      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
          <Card sx={{ width: "96%", height:{xs:40}, marginBottom:1}}>
     <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="full"
        width="full"
        image="./../../assets/Rectangle 181.png"
      />
        </Grid>
        <Grid item xs={3}>
      <CardContent sx={{display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height:"40%",
   }}>
        <h6>
         Name
        </h6>
      </CardContent>
      </Grid>
      <Grid item xs={6}>
      <CardActions sx={{display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    height:"40%",
   }}>
       <Button onClick={handleClickedEdit}><ModeEditIcon sx={{color:"#6EAB49"}}/></Button>
      <Button onClick={handleClickedDelete}><DeleteIcon sx={{color:"#E53E3E"}}/></Button>

      </CardActions>
      </Grid>
      </Grid>
      </Box>
    </Card>
    </Box>
        </Grid>
      </Grid>
    </Box>
  </Box>

  {/* New Category start from here */}
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={opens}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={opens}>
          <Box sx={style}>
                        <Box
                        //    alignItems="center"
                        //    justifyContent={'center'}
                          >
                   <Typography>
                    Category 
                   </Typography>
                   <TextField id="outlined-basic" label="Category" variant="outlined" type="text" sx={{width:"100%", marginY:2}} onChange={(e)=>setCategory(e.target.value)}/>
                   <Button variant="contained" sx={{bgcolor:"#6610F2",":hover": {
                                bgcolor: '#6EAB49'
                            } , width:"32%",
                            display:'flex',
                            flexDirection:'column',
                            alignItems:"center",
                            justifyContent:'center',
                            margin:'auto'
                            }} onClick={handleNewCategory}>CREATE</Button>
                        </Box>
                    </Box>
          {/* </Box> */}
        </Fade>
  </Modal>

{/* New SubCategory start from here */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleSubcategory}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
                        <Box
                        //    alignItems="center"
                        //    justifyContent={'center'}
                          >
                   <Typography sx={{margin:2}}>
                    Category 
                   </Typography>
                   {/* <TextField id="outlined-basic" label="Category" variant="outlined" type="text" sx={{width:"100%", marginY:2}}/> */}
                    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={10}>Electronics</MenuItem>
          <MenuItem value={20}>Daily Products</MenuItem>
          <MenuItem value={30}>ABCDE</MenuItem>
        </Select>
      </FormControl>
                   <Typography sx={{margin:2}}>
                    SubCategory 
                   </Typography>
                   <TextField id="outlined-basic" label="SubCategory" variant="outlined" type="text" sx={{width:"100%", marginBottom:2}}/>
                   <Button variant="contained" sx={{bgcolor:"#6610F2",":hover": {
                                bgcolor: '#6EAB49'
                            } , width:"32%",
                            display:'flex',
                            flexDirection:'column',
                            alignItems:"center",
                            justifyContent:'center',
                            margin:'auto',
              
                            }} onClick={handleClickCreate}>CREATE</Button>
                        </Box>
                    </Box>
          {/* </Box> */}
        </Fade>
      </Modal>

    </>
    );
};

export default Category;