import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from "@material-ui/core/styles";
import theme from "../src/theme";
import {Modal} from "@material-ui/core";
import ModalButton from "./modalButton";

const useStyles = makeStyles((theme) => ({
    editButton: {
        cursor: "pointer",
        "&:hover": {
            color: "#a1a1a1",
        }
    },
    listItem: {
        cursor: "default",
    }
}));

const Tags = ({tags}) => {
    const classes = useStyles(theme);

    return (
        <>
            {tags && tags.map(tag => (
                <ListItem className={classes.listItem} key={tag._id} >
                    <ListItemIcon><FiberManualRecordIcon style={{color: tag.color}} /></ListItemIcon>
                    <ListItemText primary={tag.text} />
                    <ListItemIcon>
                        <ModalButton
                            title={"Edit tag"}
                            button={<EditIcon className={classes.editButton}/>}
                            content={<p>Edit tag</p>}
                        />
                    </ListItemIcon>
                </ListItem>
            ))}
            <ModalButton
                title={"Add tag"}
                button={
                    <ListItem button>
                        <ListItemIcon><AddIcon/></ListItemIcon>
                        <ListItemText primary={"Add"} />
                    </ListItem>
                }
                content={
                    <div>
                        <p>test</p>
                        <p>test</p>
                        <p>test</p>
                        <p>test</p>
                        <p>test</p>
                        <p>test</p>

                    </div>
                }
            />
        </>
    )
}

export default Tags;