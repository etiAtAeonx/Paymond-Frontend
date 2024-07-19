import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import UserTable from './userTable';
import TableNoData from '../table-no-data';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import * as XLSX from 'xlsx';
import { Box, CircularProgress, TableCell, TableHead, TableRow } from '@mui/material';
import UserTableRow from '../user-table-row';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserPage() {
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('https://d29ujvr1u9v7px.cloudfront.net/api/employees', {
          params: {
            start: page * rowsPerPage,
            limit: rowsPerPage,
          },
        });
        if (res.data.error) {
          setLoading(false);
          toast.error(res.data.message);
        } else {
          setLoading(false);
          setUsers(res.data.data);
          console.log(res.data.data);
          toast.success('Users fetched successfully');
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    };

    fetchUsers();
  }, [page, rowsPerPage]);

  const [open, setOpen] = useState(false);
  const [modalQRCode, setModalQRCode] = useState('');

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.firstName + ' ' + n.lastName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleQRCodeClick = (qrcodeUrl) => {
    setModalQRCode(qrcodeUrl);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setModalQRCode('');
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  const handleDownloadQRCode = () => {
    const link = document.createElement('a');
    link.href = modalQRCode;
    link.download = 'qrcode.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [listCard, setListCard] = useState(true);

  const [file, setfile] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setfile(file.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        if (json.length > 0) {
          const columns = Object.keys(json[0]);
          setColumns(columns);
        }

        setRows(json);
        setListCard(false);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  const handleSaveToApi = () => {
    const apiUrl = 'https://d29ujvr1u9v7px.cloudfront.net/api/upload';

    const formData = new FormData();
    formData.append('file', file);
    console.log(rows);
    axios
      .post(apiUrl, formData, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      })
      .then((response) => {
        setListCard(true);
        // fetchUsers();
        console.log('Data successfully stored:', response.data);
      })
      .catch((error) => {
        console.error('Error storing data:', error);
      });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const columnsWithIndex = ['No.', ...columns];
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Card List</Typography>

        <Button variant="contained" component="label">
          Bulk Upload
          <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        {rows.length > 0 && (
          <>
            <Box sx={{ maxHeight: 800, overflow: 'auto', mt: 2 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columnsWithIndex.map((column) => (
                      <TableCell key={column}>{capitalizeFirstLetter(column)}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      {columns.map((column) => (
                        <TableCell key={column}>{row[column]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Button variant="contained" color="primary" onClick={handleSaveToApi} sx={{ m: 2 }}>
              Submit
            </Button>
          </>
        )}

        {listCard && (
          <>
            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <UserTableHead
                    order={order}
                    orderBy={orderBy}
                    rowCount={users.length}
                    numSelected={selected.length}
                    onRequestSort={handleSort}
                    onSelectAllClick={handleSelectAllClick}
                    headLabel={[
                      { id: 'name', label: 'Name' },
                      { id: 'company', label: 'Company' },
                      { id: 'department', label: 'Department' },
                      { id: 'designation', label: 'Designation' },
                      { id: 'phone', label: 'Contact' },
                      { id: 'email', label: 'Email' },
                      { id: 'qrcodeUrl', label: 'View' },
                    ]}
                  />
                  {loading && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '300px',
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  )}
                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <UserTable
                          key={row.id}
                          name={`${row.firstName} ${row.lastName}`}
                          company={row.company}
                          department={row.department}
                          designation={row.designation}
                          email={row.email}
                          phone={row.phone}
                          qrcodeUrl={row.qr_code}
                          selected={selected.indexOf(`${row.firstName} ${row.lastName}`) !== -1}
                          handleClick={(event) =>
                            handleClick(event, `${row.firstName} ${row.lastName}`)
                          }
                          onQRCodeClick={() => handleQRCodeClick(row.qr_code)}
                        />
                      ))}
                    <TableEmptyRows
                      height={77}
                      emptyRows={emptyRows(page, rowsPerPage, users.length)}
                    />

                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </>
        )}
        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={modalQRCode}
            alt="QR Code"
            style={{ width: '50%', height: 'auto', marginBottom: 16 }}
          />
          <Button variant="contained" color="primary" onClick={handleDownloadQRCode}>
            Download
          </Button>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
