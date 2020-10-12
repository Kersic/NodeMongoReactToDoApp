import React, {useContext, useState} from "react";
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
import DeleteIcon from '@material-ui/icons/Delete';
import {colorRegex} from "../helpers";
import {TagsContext} from "../contexts/tagsProvider";

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

const Tags = () => {
    const classes = useStyles(theme);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const {tags, postTag, updateTag, deleteTag } = useContext(TagsContext);

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
                            confirmAction={() => updateTag(tag._id, name, color)}
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
                confirmAction={() => postTag(name, color)}
                disableConfirm={!name || !colorRegex.test(color)}
            />
        </>
    )
}

export default Tags;