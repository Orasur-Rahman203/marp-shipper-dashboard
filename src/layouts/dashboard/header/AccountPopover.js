import { useState } from 'react';
// @mui
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Backdrop from '@mui/material/Backdrop';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { Circles } from 'react-loader-spinner'
// mocks_
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import BounceLoader from "react-spinners/BounceLoader";
// eslint-disable-next-line import/no-unresolved
import { logoutHandler } from 'src/apiHandler/customApiHandler';
import Link from "@mui/material/Link";
// import Link from '@mui/material/Link';
import account from '../../../_mock/account';


// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {id:1,
    label: 'Home',
    icon: 'eva:home-fill',
    path:'/dashboard/app'
  },
  {
    id:2,
    label: 'Profile',
    icon: 'eva:person-fill',
    path:'/dashboard/profile'
  },
  // {
  //   label: 'Settings',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate=useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose=()=>{
    setOpen(null);
  }

  const handleLogout =async() => {
    console.log("Log out button");
    // setOpen(null);
    setLoader(true);
    const data=await logoutHandler("https://marpapi.techanalyticaltd.com/auth/logout");
if(data.success){
  swal("Log out!", "Your are successfully logout!", "success");
  navigate('/login', { replace: true });
  setLoader(false);
}
  };

  return (
    <>
    {
      loader ?
      <Typography>True</Typography>
//       <Backdrop
//       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, height:"100vh" }}
//       open={open}
//       onClick={handleClose}
//     >
//       {/* <BounceLoader
// color='#c7eed8'
//         load={loader}
//         size={50}
//         aria-label="Loading Spinner"
//         data-testid="loader"
//       /> */}
//             {/* <Circles
//   height="80"
//   width="80"
//   color="#c7eed8"
//   ariaLabel="circles-loading"
//   wrapperStyle={{}}
//   wrapperClass=""
//   visible={loader}
// /> */}
//     </Backdrop> 
    :
 <>
     <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL" />
      </IconButton>
     

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.id} onClick={handleClose}><Link href={option.path}>
            {option.label}
          </Link>
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
<Box>
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
        </Box>
      </Popover> 
 </>
    }
    </>
  );
}
