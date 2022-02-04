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
    Box,
    IconButton, Collapse
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon, KeyboardArrowUp as KeyboardArrowUpIcon, KeyboardArrowDown as KeyboardArrowDownIcon } from "@material-ui/icons";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../../actions/posts";
// import AnnouncementDetails from "../General/Announcement/AnnouncementDetails";

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

const AnnouncementCard = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [openDetail, setOpenDetail] = useState(false);

    const posts = useSelector((state) => state.posts); //selector to get all posts using the useEffect
    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return(
            
        <Paper style={{ margin: "16px 0px", padding: 8, }}>
            <Typography variant="h6">Latest Announcements</Typography>
            Problem: it shows all details when open collapses
            <br/>Suppose To: Show only latest 5 announcements
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    
                    <TableBody>
                    {posts.map((row) => (
                        <React.Fragment>
                        <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpenDetail(!openDetail)}>
                                {openDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                            <TableCell className={classes.tableCell} component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell className={classes.tableCellMobile}>{row.name}</TableCell>
                            <TableCell className={classes.tableCell}>{moment(row.createdAt).fromNow()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                <Collapse in={openDetail} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 12 }}>
                                        <Typography variant="h6">{row.title}</Typography>
                                        <Typography variant="body2">
                                            By {row.name}, {moment(row.createdAt).fromNow()}
                                        </Typography>
                                        <div></div>
                                        <div></div>
                                        <Typography variant="body2">
                                            {row.message.split("\n").map((item, idx) => {
                                                return (
                                                    <React.Fragment key={idx}>
                                                        {item}
                                                        <br />
                                                    </React.Fragment>
                                                );
                                            })}
                                        </Typography>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </React.Fragment>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </Paper>
           
    );
};

export default AnnouncementCard;
