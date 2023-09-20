import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import BounceLoader from "react-spinners/BounceLoader";
import { Circles } from 'react-loader-spinner'
import swal from 'sweetalert';
// components
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import Iconify from '../../../components/iconify';
import {loginHandler} from "../../../apiHandler/customApiHandler"

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [phone, setPhone]=useState("");
  const [password, setPassword]=useState("");
  // const [loader, setLoader]=useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  

  const handleClick = async() => {
    setShow(true);
    handleOpen();
   const data=await loginHandler("https://marpapi.techanalyticaltd.com/auth/login",phone, password);
   console.log("phone ,password", phone, password, data.errMsg
   );
   if(data.success){
     swal("Log in!", "Your are successfully loged in!", "success");
     navigate('/dashboard', { replace: true });
     setShow(false);
    }else{
      swal("Log in failure!", data.errMsg);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
    {
      show ? 
         <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // eslint-disable-next-line no-restricted-globals
        open={open}
        // eslint-disable-next-line no-undef
        onClick={handleClose}
      >
             {/* <BounceLoader
color='#c7eed8'
        load={show}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
      <Circles
  height="80"
  width="80"
  color="#c7eed8"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={show}
/>
         {/* <CircularProgress color="inherit" /> */}
      </Backdrop>
      
       :
      <Stack spacing={3}>
      <TextField name="phone" label="Phone Number" onChange={e => setPhone(e.target.value)}/>

      <TextField
        name="password"
        label="Password"
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
    </Stack>
    }
      {/* <Stack spacing={3}>
        <TextField name="phone" label="Phone Number" onChange={e => setPhone(e.target.value)}/>

        <TextField
          name="password"
          label="Password"
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
      </Stack> */}

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton sx={{marginTop:4, bgcolor:"#6EAB49", color:"white",":hover": {
                                bgcolor: '#6610F2'
                            }, marginY:2, width:"100%"}} fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>Login</LoadingButton>
            {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // eslint-disable-next-line no-restricted-globals
        open={open}
        // eslint-disable-next-line no-undef
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </>
  );
}
