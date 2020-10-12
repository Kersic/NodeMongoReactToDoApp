import React, {useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from "@material-ui/core/styles";
import theme from "../src/theme";
import ModalButton from "./modalButton";
import TagForm from "./tagForm";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    iconButton: {
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
    const [name, setName] = useState("");
    const [color, setColor] = useState("");

    const postTag = () => {
        axios({
            method: 'post',
            url: process.env.SERVER_URL + "tag",
            data: {
                text: name,
                color: color
            }
        }).catch(err => console.log(err));
    }

    const updateTag = (id) => {
        axios({
            method: 'put',
            url: process.env.SERVER_URL + `tag/${id}`,
            data: {
                text: name,
                color: color
            }
        }).catch(err => console.log(err));
    }
    const deleteTag = (id) => {
        axios({
            method: 'delete',
            url: process.env.SERVER_URL + `tag/${id}`,
        }).catch(err => console.log(err));
    }

    return (
        <>
            {tags && tags.map(tag => (
                <ListItem className={classes.listItem} key={tag._id} >
                    <ListItemIcon><FiberManualRecordIcon style={{color: tag.color}} /></ListItemIcon>
                    <ListItemText primary={tag.text} />
                    <ListItemIcon>
                        <ModalButton
                            title={"Edit tag"}
                            button={<EditIcon className={classes.iconButton}/>}
                            content={<TagForm tag={tag} name={name} color={color} setName={setName} setColor={setColor} />}
                            confirmAction={() => updateTag(tag._id)}
                        />
                        <DeleteIcon className={classes.iconButton} onClick={() => deleteTag(tag._id)}/>
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
                    <TagForm name={name} color={color} setName={setName} setColor={setColor} />
                }
                confirmAction={postTag}
            />
        </>
    )
}

export default Tags;