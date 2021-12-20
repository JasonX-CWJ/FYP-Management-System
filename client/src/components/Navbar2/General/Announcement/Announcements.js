import React, { useEffect, useState } from "react";
import {
    InputAdornment,
    makeStyles,
    Grow,
    Container,
    Paper,
    TableSortLabel,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    TablePagination,
    Toolbar,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Search as SearchIcon } from "@material-ui/icons";

//import the actions for get and delete
import { getPosts, deletePost } from "../../../../actions/posts";

import AddAnnouncementPopup from "./AddAnnouncementPopup";
import Notification from "../../Reusable/Notification";
import ConfirmDialog from "../../Reusable/ConfirmDialog";
import Form from "../../../Form/Form";
import AnnouncementDetails from "./AnnouncementDetails";

const useStyles = makeStyles((theme) => ({
    tableRow: {
        border: 0,
        height: 50,
        maxHeight: 10,
        whiteSpace: "pre-wrap",
    },
    tableCell: {
        maxWidth: 200, // percentage also works
        maxHeight: 100,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    tableCellMobile: {
        maxWidth: 200, // percentage also works
        maxHeight: 100,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
}));

const headCells = [
    { id: "title", label: "Title", mobileHidden: false },
    { id: "message", label: "Message", mobileHidden: true },
    { id: "name", label: "From", mobileHidden: true },
    { id: "department", label: "Department", mobileHidden: false },
    { id: "createdAt", label: "Date", mobileHidden: false },
];

const Announcements = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const posts = useSelector((state) => state.posts); //selector to get all posts using the useEffect
    const [currentId, setCurrentId] = useState(0); //state to fetch the correct announcement post
    const [openPopup, setOpenPopup] = useState(false); //state for the popup dialog to add annoucement

    //Get all announcement posts
    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    //Table pagination states
    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    //Table Arrange States
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("createdAt");
    const [filter, setFilter] = useState({
        fn: (items) => {
            return items;
        },
    });

    const handleChangeRows = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSortRequest = (cellId) => {
        const isAsc = orderBy === cellId && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(cellId);
    };

    const handleAfterRowChange = () => {
        return stableSort(filter.fn(posts), getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    };

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }
    function getComparator(order, orderBy) {
        return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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

    // Search
    const handleSearch = (event) => {
        let target = event.target;
        setFilter({
            fn: (items) => {
                if (target.value == "") return items;
                else return items.filter((x) => x.title.toLowerCase().includes(target.value.toLowerCase()) || x.name.toLowerCase().includes(target.value.toLowerCase()));
            },
        });
    };

    // Popup dialog and Notification states
    const [notify, setNotify] = useState({ isOpen: false, message: "", type: "" });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subtitle: "" });

    const openForm = (item) => {
        setCurrentId(item._id);
        setOpenPopup(true);
    };

    const confirmDelete = (id) => {
        dispatch(deletePost(id));
        setNotify({ isOpen: true, message: "Deleted Successfully!", type: "error" });
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
    };

    return (
        <Grow in>
            <Container maxWidth={false}>
                <Typography variant="h5"> All Announcements</Typography>
                <div></div>
                <Paper>
                    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                        <TextField
                            variant="outlined"
                            label="Search Announcement/Name"
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleSearch}
                        />
                        <Button variant="contained" color="primary" onClick={() => setOpenPopup(true)}>
                            New
                        </Button>
                    </Toolbar>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    {headCells.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                            className={headCell.mobileHidden ? classes.tableCellMobile : classes.tableCell}
                                            sortDirection={orderBy === headCell.id ? order : false}
                                        >
                                            {headCell.disableSorting ? (
                                                headCell.label
                                            ) : (
                                                <TableSortLabel
                                                    active={orderBy === headCell.id}
                                                    direction={orderBy === headCell.id ? order : "asc"}
                                                    onClick={() => {
                                                        handleSortRequest(headCell.id);
                                                    }}
                                                >
                                                    {headCell.label}
                                                </TableSortLabel>
                                            )}
                                        </TableCell>
                                    ))}
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleAfterRowChange().map((row) => (
                                    <AnnouncementDetails row={row} setConfirmDialog={setConfirmDialog} confirmDelete={confirmDelete} openForm={openForm} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        page={page}
                        rowsPerPageOptions={pages}
                        rowsPerPage={rowsPerPage}
                        count={posts.length}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRows}
                    />
                </Paper>

                <AddAnnouncementPopup openPopup={openPopup} setOpenPopup={setOpenPopup} setCurrentId={setCurrentId}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} setNotify={setNotify} />
                </AddAnnouncementPopup>
                <Notification notify={notify} setNotify={setNotify} />
                <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
            </Container>
        </Grow>
    );
};

export default Announcements;
