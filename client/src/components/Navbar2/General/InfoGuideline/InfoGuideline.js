import React, { useEffect, useState } from "react";
import { 
    InputAdornment,
    Container,
    Grow,
    Typography,
    Paper,
    TextField,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";


const InfoGuideline = () => {

    // //Table Arrange States
    // const [order, setOrder] = useState("desc");
    // const [orderBy, setOrderBy] = useState("createdAt");
    

    return (
        <Grow in>
            <Container maxWidth={false}>
            <Typography variant="h5"> All Info and Guidelines</Typography>
            <div></div>
            <Paper>
            <Typography variant="h5">Test</Typography>
            </Paper>
            </Container>
        </Grow>
    );
};

export default InfoGuideline;
