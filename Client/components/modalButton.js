import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 5, 4),
        outline: "none",
    },
    modalButton: {
        marginRight: "15px",
        marginTop: "30px",
    },
    title: {
        marginBottom: "20px",
    }
}));

export default function ModalButton({button, content, title, confirmAction, disableConfirm}) {
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
                    <Typography className={classes.title} variant="h6" noWrap>
                        {title}
                    </Typography>
                    {content}
                    <Button variant="contained" color="default" className={classes.modalButton} onClick={handleSuccess} disabled={disableConfirm}>
                        Confirm
                    </Button>
                    <Button variant="contained" color="primary" className={classes.modalButton} onClick={handleClose}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </div>
    );
}