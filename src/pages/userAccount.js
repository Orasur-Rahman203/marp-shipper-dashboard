import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet-async';
import Modal from '@mui/material/Modal';
import swal from 'sweetalert';
import {IconButton, InputAdornment} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// eslint-disable-next-line import/named
import {getRequestHandler, postRequestHandler, patchRequestHandler, photoUploadRequestHandler, deleteRequestHandler} from "../apiHandler/customApiHandler"
import BackDrop from "../backDrop"
import Iconify from '../components/iconify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const Container = styled('div')({
    border: '2px dotted #03A550',
    borderRadius:"10px",
    height: "6rem",
    width: "100%",
    textAlign: 'center',
    // justifyContent:"center",
    // alignContent:"center"
    // cursor: 'pointer',
  });

const userAccount = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [reloader, setReloader]=React.useState(true);
// eslint-disable-next-line react-hooks/rules-of-hooks
const [password, setPassword]=useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
const [ConPassword, setConPassword]=useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
const [show, setShow]=useState(false);
// eslint-disable-next-line react-hooks/rules-of-hooks
const [phoneNumber, setPhoneNumber]=useState("")
// eslint-disable-next-line react-hooks/rules-of-hooks
const [email, setEmail]=useState("")
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showPassword, setShowPassword] = useState(false);

// eslint-disable-next-line react-hooks/rules-of-hooks
const [url, setUrl]=useState("")
// eslint-disable-next-line react-hooks/rules-of-hooks
const [role, setRole]=useState("")
// eslint-disable-next-line react-hooks/rules-of-hooks
const [age, setAge]=useState(0)
// eslint-disable-next-line react-hooks/rules-of-hooks
const [gender, setGender]=useState("")
// eslint-disable-next-line react-hooks/rules-of-hooks
const [maritalStatus, setMaritalStatus]=useState("")
// eslint-disable-next-line react-hooks/rules-of-hooks
const [address, setAddress]=useState("")
// eslint-disable-next-line react-hooks/rules-of-hooks
// const [role, setRole]=useState("")

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setShow(true);
        async function getData() {
          const adminProfile = await getRequestHandler(`https://marpapi.techanalyticaltd.com/admin/profile`);
          // setData(adminProfile.data);
          setUrl(adminProfile.data.profile.profilePhotoBucketURL);
          setRole(adminProfile.data.role);
          setPhoneNumber(adminProfile.data.phoneNumber);
          setEmail(adminProfile.data.email);
          // console.log("admin Profile url role",adminProfile.data, url, role);
          setShow(false);
        }
        getData();
      }, [reloader]);

const handleUpdateProfile=()=>{
  const DOB=new Date().toLocaleDateString("de-DE");
const Age=parseInt(age, 10);
    async function getData() {
        const adminProfileRes = await patchRequestHandler(`https://marpapi.techanalyticaltd.com/admin/profile`, {fullName:role, age:Age, gender, maritalStatus, address});
        // setData(categoriesData.data);
        console.log("admin Profile update Res", adminProfileRes);
        setReloader(!reloader);
      }
      getData();
}
const handleSetPassword=()=>{
    async function getData() {
      const adminProfileRes = await patchRequestHandler(`https://marpapi.techanalyticaltd.com/admin/updateaccountinfo`, {password, phoneNumber, email});
        // setData(categoriesData.data);
        swal("Updated!", "Your are successfully updated your account!", "success");
        setPassword("");
        setConPassword("");
       setReloader(!reloader);
      }
      getData();
}
 const handleDisable=()=>{
  console.log("handleDisable");
  setPassword("");
  setConPassword("");
 setReloader(!reloader);
 }



// eslint-disable-next-line react-hooks/rules-of-hooks
const [droppedImages, setDroppedImages] = useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
const [createFile, setCreateFile] = useState("");
// eslint-disable-next-line react-hooks/rules-of-hooks
const fileInputRef = React.useRef(null);
const handleDragOver = (event) => {
  event.preventDefault();
};
const handleDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  handleFiles(files);
};
const handleFileInputChange = (event) => {
  const files = event.target.files;
  handleFiles(files);
};
const handleFiles = (files) => {
  const images = Array.from(files).map((file) => URL.createObjectURL(file));
  setDroppedImages(images);
  const profilePhoto= new FormData();
  profilePhoto.append('image', files[0]);
  async function getData() {
    try {
      await photoUploadRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket/uploadsingleimage?uploadto=profilePhotos`, profilePhoto)
    //  .then((response)=>console.log(response.data.data.publicUrl))
     .then((response)=>setCreateFile(response.data.data.publicUrl))
     setShow(false);
   } catch (error) {
     console.error(error);
   }}
  getData();
};

const handleBrowseClick = () => {
  fileInputRef.current.click();
};

const handleUpdateImage=async()=>{
  const profilePhotoBucketURL=createFile;
  try {
    const adminProfileRes = await patchRequestHandler(`https://marpapi.techanalyticaltd.com/admin/profile`,{profilePhotoBucketURL});
    setShow(false)
    setReloader(!reloader);
    setDroppedImages(false);
    setOpen(false);
  } catch (error) {
    console.error(error);
    setDroppedImages(false);
    setOpen(false);
  }
}


const handleDeleteCategoryImage=async()=>{
    let parts;
    let fileNames;
    if(createFile)
    {
      parts = createFile.split("profilePhotos/");
     fileNames = parts.pop();
    }
    try {
      const response = await deleteRequestHandler(`https://marpapi.techanalyticaltd.com/admin/bucket/files`,{"bucketName": "profilePhotos", fileNames});
      setShow(false)
      setDroppedImages(false);
    } catch (error) {
      // Handle the error
      console.error(error);
      setDroppedImages(false);
    }
  }

// eslint-disable-next-line react-hooks/rules-of-hooks
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

  return(
    <>
    <Helmet>
    <title> Profile | admin dashboard </title>
  </Helmet>

        <Box sx={{ paddingX: "2%" }}>
            {
                show ?
<BackDrop show={show}/>
:
<>
   <Typography variant='h2' >User Profile</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={7}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems="center"
                        justifyContent={'center'}
                        margin='auto'
                        maxWidth={540}
                        marginTop={5}
                        //    padding={3}
                        borderRadius={2}
                        boxShadow={'5px 5px 10px #ccc'}
                        sx={{
                            ":hover": {
                                boxShadow: '10px 10px 20px #ccc'
                            }
                        }}
                    >
                    <Typography variant='h4'>Personal Details </Typography>
                        <Avatar sx={{width:160,height:160, marginTop:3}} alt="Travis Howard" src={url} />
              
                        <Button
                        onClick={handleOpen}
                         variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, marginY:2, width:"80%"}}>UPDATE YOUR IMAGE</Button>
                   <TextField id="outlined-basic" label="Full Name" variant="filled" type="text"
                  //  defaultValue={role}
                   onChange={(e)=>setRole(e.target.value)}
                    sx={{width:"80%", marginX:"10%", marginY:"1%"}}/>
                       <TextField id="outlined-basic" label="Age" variant="filled" type="number"
                  //  defaultValue={email}
                   sx={{width:"80%", marginX:"10%", marginY:"1%"}}
                   onChange={(e)=>setAge(e.target.value)}
                   />
                   <TextField id="outlined-basic" label="Gender" variant="filled" type="text"
                  //  defaultValue={phoneNumber}
                   sx={{width:"80%", marginX:"10%", marginY:"1%"}}
                   onChange={(e)=>setGender(e.target.value)}/>
                   <TextField id="outlined-basic" label="Marital Status" variant="filled" type="text"
                  //  defaultValue={phoneNumber}
                   sx={{width:"80%", marginX:"10%", marginY:"1%"}}
                   onChange={(e)=>setMaritalStatus(e.target.value)}/>
                   {/* <Typography>
                    Email 
                   </Typography> */}
                   <TextField id="outlined-basic" label="Address" variant="filled" type="email"
                  //  defaultValue={email}
                   sx={{width:"80%", marginX:"10%", marginY:"1%"}}
                   onChange={(e)=>setAddress(e.target.value)}
                   />
                   <Button variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                                bgcolor: '#6EAB49'
                            }, marginY:2, width:"80%"}} onClick={handleUpdateProfile}>PROFILE UPDATE</Button>
                        {/* </Box> */}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems="center"
                        justifyContent={'center'}
                        margin='auto'
                        maxWidth={480}
                        marginTop={5}
                        //    padding={3}
                        borderRadius={2}
                        boxShadow={'5px 5px 10px #ccc'}
                        sx={{
                            ":hover": {
                                boxShadow: '10px 10px 20px #ccc'
                            }
                        }}
                    >
                        <Typography variant='h4'>Change your password</Typography>
                        <img src="../../assets/confirm password.png" alt="Italian Trulli"/>
                        {/* <Box
                           alignItems="center"
                           justifyContent={'center'}
                          > */}
                   {/* <Typography>
                    New Password
                   </Typography> */}
                   {/* <Typography>
                    Confirm Password
                   </Typography> */}
                   {/* <TextField id="outlined-basic" label="Confirm Password" variant="filled" type="password" 
                   sx={{width:"80%", marginX:"10%"}} onChange={(e)=>setConPassword(e.target.value)}/> */}
    <TextField id="outlined-basic" label="Phone Number" variant="filled" type="number"
                   defaultValue={phoneNumber}
                   sx={{width:"80%", marginX:"10%", marginY:"2%"}}
                   onChange={(e)=>setPhoneNumber(e.target.value)}/>
                   {/* <Typography>
                    Email 
                   </Typography> */}
                   <TextField id="outlined-basic" label="Email" variant="filled" type="email"
                   defaultValue={email}
                   sx={{width:"80%", marginX:"10%", marginY:"2%"}}
                   onChange={(e)=>setEmail(e.target.value)}
                   />
        <TextField
        sx={{width:"80%", marginX:"10%", marginY:"2%"}}
        id="outlined-basic"
        variant="filled"
        placeholder='password must be 6 characters'
        name="password"
        label="New password"
        onChange={e => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
        <TextField
        sx={{width:"80%", marginX:"10%", marginY:"2%"}}
        id="outlined-basic" 
        placeholder='password must be 6 characters'
        label="Confirm Password" 
        variant="filled"
        onChange={(e)=>setConPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
                   {
                    (password===ConPassword) ?
                    <Button variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                      bgcolor: '#6EAB49'
                  }, marginY:2, width:"80%"}} 
                  onClick={handleSetPassword}
                  >ACCOUNT UPDATE</Button> :
                //   <Button variant="contained" sx={{bgcolor:"#6610F2", color:"white",":hover": {
                //     bgcolor: '#6EAB49'
                // }, marginY:2, width:"80%"}} 
                // onClick={handleSetPassword}
                // >DISABLE BUTTON</Button>
                <Button sx={{bgcolor:"#B20000", color:"white",":hover": {
                  bgcolor: '#6610F2'
              }, marginY:2, width:"80%"}} 
              onClick={handleDisable}>PassWord Not Match</Button>
                   }
                  
                        </Box>
                    {/* </Box> */}
                </Grid>
            </Grid>
</>
            }
        </Box>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
              <Box>
              <Box sx={{display:'flex',
              justifyContent:'center',
              alignContent:'center',
              marginY:5
              }}>
                  <Box sx={{ display: "flex" }}> 
                   {
                    droppedImages ?
                    <>
                    <Container sx={{ mx: ".5rem" }}>
                    <img src={droppedImages} alt={`Dropped`} style={{ width: "auto", maxHeight: '100%' }} />
                          <DeleteForeverIcon sx={{color:'red'}} onClick={handleDeleteCategoryImage}/>
                  </Container> 
                    </>
                  :
                    <Container sx={{ display: "flex", flexDirection: "column", justifyContent: "center", m: "1rem", mx:"1.5rem"}} onDragOver={handleDragOver} onDrop={handleDrop}>
                    <Box >
                    <FileDownloadIcon/>
                      <Typography>Drag and drop your file here<br/> or</Typography>
                      <div>
                        <Button variant="contained" onClick={handleBrowseClick} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>SELECT FILE</Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileInputChange}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </Box>
                  </Container>
                   }
                </Box>
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
            
              }}>
              {/* <Button variant="contained" onClick={handleBrowseClick} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>Choose Image</Button> */}
              <Button variant="contained" 
              sx={{
                bgcolor: "#6610F2", ":hover": {
                  bgcolor: '#6EAB49'
                }, width: "32%"}}
               onClick={handleUpdateImage}>Save Photo</Button>
              </Box>
              {/* <Button variant="contained" onClick={handleBrowseClick} sx={{ color: "#fff", bgcolor: "#6EAB49", ":hover": {
                bgcolor: '#03A550'
              },}}>Choose Image</Button>
              <Button variant="contained" sx={{
                bgcolor: "#6610F2", ":hover": {
                  bgcolor: '#6EAB49'
                }, width: "32%",
                display: 'flex',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
                margin: 'auto'
              }} onClick={handleUpdateProfile}>Save Photo</Button> */}
            </Box>
          </Box>
      </Modal>

        </>
        )
};
export default userAccount;