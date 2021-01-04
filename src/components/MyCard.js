import React, { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    requirePropFactory,
    Typography,
  } from "@material-ui/core";
//import React from "react";
import { getMatchDetail } from "../api/Api";

const Mycard=({match})=>{

    const [detail, setDetail] = useState({});
    const [open,setOpen]=useState(false);
    const handleClick=(id)=>{
        //alert(id);
        getMatchDetail(id)
            .then((data)=>{
                console.log("MATCH DATA",data);
                setDetail(data);
                handleOpen();
            })
            .catch((error)=>console.log(error));
    };

    const getMatchCard=()=>{
        return (
            <Card style={{marginTop:20}}>
                <CardContent>
                    <Grid container justify="center" alignItems="center" spacing={4}>
                        <Grid item >
                            <Typography variant="h5">{match["team-1"]}</Typography>
                        </Grid>
                        <Grid item>
                        <Typography variant="h5"> Vs</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{match["team-2"]}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justify="center">
                        <Button onClick={()=> {handleClick(match.unique_id);}} item variant="contained" color="secondary"> 
                            Show Detail
                        </Button>
                        <Button style={{marginLeft:5}} item variant="contained" color="secondary"> 
                        Start Time {new Date(match.dateTimeGMT).toLocaleString()}
                        </Button>
                    </Grid>
                </CardActions>
            </Card>
        );
    }

    const handleClose=()=>{
        setOpen(false);
    }
    const handleOpen=()=>{
        setOpen(true);
    }

    const getDialog=()=>(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">{"Match Detail.."}</DialogTitle>
            <DialogContentText id="alert-dialog-description">
                <Typography>{detail.stat}</Typography>
                <Typography>
                    Match
                    <span style={{fontStyle:"italic",fontWeight:"bold"}}>
                        {detail.matchStarted?"Started":"Still not Started"}
                    </span>
                </Typography>
                <Typography>
                    Score
                    <span style={{fontStyle:"italic",fontWeight:"bold"}}>
                        {detail.score}
                    </span>
                </Typography>

            </DialogContentText>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
    return <Fragment>
        {getMatchCard()}
        {getDialog()}
    </Fragment>;
    
}

export default Mycard;