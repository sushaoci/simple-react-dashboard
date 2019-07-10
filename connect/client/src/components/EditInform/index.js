import React, { Fragment, useState, useEffect } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import axios from 'axios'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        margin: theme.spacing(5),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        float: "right"
    },

    rightIcon: {
        marginLeft: theme.spacing(1),
    },
}));

function Inform(props) {

    // useEffect(() => {
    //     // let data = {
    //     //     url: "/api/actors",
    //     //     method: "get"
    //     // }

    //     axios.post('/api/actors',{
    //         tilte:title,
    //         content:content,
    //     })
    //     .then(res =>{
    //         setTitle('')
    //         setContent('')
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }, [])

    // axios.get('/api/informs')
    //     .then(res=>console.log(res))

    const classes = useStyles();

    return (
            <form className={classes.container} noValidate autoComplete="off">

                <TextField
                    id="outlined-dense"
                    label="Topic"
                    className={clsx(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"
                    value={props.newTitle}
                    onChange={(e) => props.handleTitle(e.target.value)}
                />

                <TextField
                    id="outlined-full-width"
                    label="NOTICE"
                    style={{ margin: 8 }}
                    placeholder="Please Enter The Content"
                    fullWidth
                    multiline
                    rowsMax="25"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={props.newContent}
                    onChange={(e) => props.handleContent(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    
                    onClick={(e) => {
                        e.preventDefault()
                        
                        if((typeof props.newTitle !== 'undefined') && (typeof props.newContent !== 'undefined')){
                            axios.post('/api/informs', {
                                title: props.newTitle,
                                content: props.newContent,
                            })
                                .then(res => {
                                    console.log(props.title)
                                    console.log(props.content)
                                    props.clearTitle()
                                    props.clearContent()
                                }).catch(err => {
                                    console.log(err)
                                })
                        }
                    }}>
                    Upload
                    <CloudUploadIcon className={classes.rightIcon} />
                </Button>

            </form>
    );
}

export default Inform
