import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: "none"
    },
    confirmButton: {
        marginRight: "15px"
    }
}));

export default function ModalButton({button, content, title, confirmAction}) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSuccess = () => {
        setOpen(false);
        if(confirmAction) confirmAction();
    };

    return (
        <div>
            <div onClick={handleOpen}>
                {button}
            </div>
            <Modal
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <Typography variant="h6" noWrap>
                        {title}
                    </Typography>
                    {content}
                    <Button variant="contained" color="default" className={classes.confirmButton} onClick={handleSuccess}>
                        Confirm
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </div>
    );
}