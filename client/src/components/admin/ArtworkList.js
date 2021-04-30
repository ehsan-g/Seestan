/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import { visuallyHidden } from '@material-ui/utils';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  createArtwork,
  deleteArtwork,
  fetchAllArtWorks,
  fetchArtists,
} from '../../actions';
import Loader from '../Loader';
import Message from '../Message';
import {
  ARTWORK_CREATE_RESET,
  ARTWORK_UPDATE_RESET,
  ARTWORK_LIST_RESET,
  ARTWORK_DELETE_RESET,
} from '../../constants/artworkConstants';

function createData(_id, title, subtitle, artist, price, editIcon) {
  return {
    _id,
    title,
    subtitle,
    artist,
    price,
    editIcon,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: '_id',
    numeric: true,
    disablePadding: true,
    label: 'آی‌دی',
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'عنوان',
  },
  {
    id: 'subtitle',
    numeric: false,
    disablePadding: false,
    label: 'ساب‌عنوان',
  },
  {
    id: 'artist',
    numeric: true,
    disablePadding: false,
    label: 'هنرمند',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'قیمت',
  },
  {
    id: 'editIcon',
    numeric: false,
    disablePadding: false,
    label: 'ویرایش',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 30,
    minHeight: '100vh',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  // TODO fix #20379.
  sortSpan: visuallyHidden,
}));

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.sortSpan}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.activatedOpacity
    ),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, deleteHandler, artists } = props;

  const dispatch = useDispatch();
  const handleOnCreate = () => {
    // to prevent creating artworks with no artist
    if (artists[0]) {
      dispatch(createArtwork());
    } else {
      alert('هیچ هنرمندی یافت نشد. حداقل یک هنرمند به دیتا‌بیس اضافه کنید');
    }
  };
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} تا انتخاب شد
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          آثار
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="پاک‌کردن">
          <IconButton onClick={() => deleteHandler()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="اضافه کزدن">
          <IconButton onClick={() => handleOnCreate()}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  artists: PropTypes.array,
};

export default function ArtworkList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('_id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);

  // Dialog from here
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const artworksList = useSelector((state) => state.artworks);
  const { loading, error, artworks } = artworksList;

  const artistList = useSelector((state) => state.artistList);
  const { artists } = artistList;

  const artworkDeleteList = useSelector((state) => state.artworkDeleteList);
  const { success: successDelete } = artworkDeleteList;

  const artworkCreate = useSelector((state) => state.artworkCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    createdArtwork,
  } = artworkCreate;

  const artworkUpdate = useSelector((state) => state.artworkUpdate);
  const { success: successUpdate } = artworkUpdate;

  const onEdit = (id) => {
    history.push(`/admin-panel/artwork/${id}/edit`);
  };

  const createTheRows = () => {
    artworks.forEach((artwork) => {
      const data = createData(
        artwork._id,
        artwork.title,
        artwork.subtitle,
        artwork.artist,
        artwork.price,
        <IconButton onClick={() => onEdit(artwork._id)}>
          <EditOutlinedIcon />
        </IconButton>
      );
      rows.push(data);
    });
  };

  const deleteHandler = () => {
    setOpen(true);
  };

  const confirmHandler = () => {
    for (let i = 0; i < selected.length; i++) {
      const found = rows.find((element) => element._id === selected[i]);

      const elementIndex = rows.indexOf(found);
      rows.splice(elementIndex, 1);
    }
    dispatch(deleteArtwork(selected));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchAllArtWorks());

    if (successDelete) {
      dispatch({ type: ARTWORK_DELETE_RESET });
      dispatch({ type: ARTWORK_LIST_RESET });
      setRows([]);
      setSelected([]);
    } else if (successUpdate) {
      dispatch({ type: ARTWORK_UPDATE_RESET });
      dispatch({ type: ARTWORK_LIST_RESET });
      setRows([]);
      dispatch(fetchAllArtWorks());
      toast.success(`ذخیره شد`);
      createTheRows();
    } else if (successCreate) {
      dispatch({ type: ARTWORK_CREATE_RESET });
      history.push(`/admin-panel/artwork/${createdArtwork._id}/edit`);
    }
  }, [dispatch, successDelete, successUpdate, rows, successCreate]);

  if (artworks && artworks[0] && !rows[0]) {
    createTheRows();
  }

  //  Dialog to here

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, rowID) => {
    const selectedIndex = selected.indexOf(rowID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowID);
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
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (rowId) => selected.indexOf(rowId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      {loading || loadingCreate ? (
        <Loader />
      ) : error ? (
        <div className={classes.root}>
          <Message variant="outlined" severity="error">
            {error}
          </Message>
        </div>
      ) : (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <EnhancedTableToolbar
              numSelected={selected.length}
              deleteHandler={deleteHandler}
              dispatch={dispatch}
              artists={artists}
            />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row._id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                        >
                          <TableCell
                            padding="checkbox"
                            onClick={(event) => handleClick(event, row._id)}
                          >
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                            size="small"
                          >
                            {row._id}
                          </TableCell>
                          <TableCell align="right">{row.title}</TableCell>
                          <TableCell align="right">{row.subtitle}</TableCell>
                          <TableCell align="right">{row.artist}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">{row.editIcon}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              labelRowsPerPage="ردیف هر صفحه"
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="فشرده "
          />
        </div>
      )}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">پاک‌کردن</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              شما کاربران انتخابی را از سرور پاک خواهید کرد
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>خیر</Button>
            <Button onClick={confirmHandler} autoFocus>
              بله
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
