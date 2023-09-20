// component
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import CategoryIcon from '@mui/icons-material/Category';
// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import LoginIcon from '@mui/icons-material/Login';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Shipper Dashboard',
    path: '/dashboard/app',
    icon: <LocalShippingIcon/>,
  },
  {
    // title: 'Order List',
    // path: '/dashboard/orderList',
    // icon: <FormatAlignLeftIcon/>,
  },

];

export default navConfig;
