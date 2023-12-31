import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, TextField, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #6610F2',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};


const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
       <Typography variant='h4' sx={{mx:2}}>Active Order List</Typography>
       <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
        <Button
          sx={{bgcolor:'white',":hover": {
            bgcolor: '#D8D8D8',
            color:"black"
        }, color:'gray', margin:2}}
          variant="contained">
            <TuneIcon/>
          filter
        </Button>
        </Grid>
        <Grid item xs={12} sm={4} sx={{textAlign:"end", alignSelf:"end", padding:3}}>
        <Button
          sx={{bgcolor:'#6610F2',":hover": {
            bgcolor: '#6EAB49',
            color:"black"
        }, color:'white',margin:1}}
          variant="contained" onClick={handleOpen}>
          Search
        </Button>
        </Grid>
      </Grid>
    <Paper sx={{ width: '96%', overflow: 'hidden',mx:2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

       {/* pagination start from here */}
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
    <Box>
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
            <Box sx={style}>
          <Box  >
          <Typography variant='h6' id="modal-modal-description" sx={{ mt: 2 }}>
           Searching Item Name
          </Typography>
          {/* <Typography padding={2} textAlign="center">SIGN IN WITH<br/> EMAIL</Typography> */}
        <TextField sx={{ width: 260 }} margin='normal' label="Search" name='email' type={'text'} onChange={(e) => setName((e.target.value))}
        />
        {/* <TextField sx={{ width: 260 , color:"primary.main" }} margin='normal' label="Password" name='password' type={'password'} variant='outlined' onChange={(e) => setPassword((e.target.value))}/> */}
        <Button variant="contained" sx={{
      background:'linear-gradient(180deg, rgba(205,167,255,1) 0%, rgba(28,4,50,1) 100%)',":hover": {
        background:'linear-gradient(180deg, rgba(162,232,179,1) 0%, rgba(1,60,35,1) 100%)',
        color:"black"
    },
      }}><Typography variant='h6' id="modal-modal-description">
      Search
     </Typography></Button>
          </Box>
        </Box>
      </Modal>
    </Box>
    </Box>
  );
}