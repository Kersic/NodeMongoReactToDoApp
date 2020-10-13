import React, {useContext, useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';
import {makeStyles} from "@material-ui/core/styles";
import ModalButton from "./modalButton";
import TagForm from "./tagForm";
import DeleteIcon from '@material-ui/icons/Delete';
import {colorRegex} from "../helpers";
import {TagsContext} from "../contexts/tagsProvider";
import {listIconsStyle} from "../src/theme";
import {TasksContext} from "../contexts/tasksProvider";
import {ListsContext} from "../contexts/listsProvider";

const useStyles = makeStyles(() => ({
    ...listIconsStyle,
}));

const Tags = () => {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [hoverId, setHoveredId] = useState("");
    const {tags, postTag, updateTag, deleteTag } = useContext(TagsContext);
    const { fetchTasks } = useContext(TasksContext);
    const { fetchList } = useContext(ListsContext);

    return (
        <>
            {tags && tags.map(tag => (
                <ListItem className={classes.listItem}
                          key={tag._id}
                          onMouseLeave={() => setHoveredId("")}
                          onMouseEnter={()=> setHoveredId(tag._id)}
                >
                    <ListItemIcon><FiberManualRecordIcon style={{color: tag.color}} /></ListItemIcon>
                    <ListItemText primary={tag.text} />
                    {hoverId === tag._id && <ListItemIcon>
                        <ModalButton
                            title={"Edit tag"}
                            button={<EditIcon className={classes.iconButton}/>}
                            content={<TagForm tag={tag} name={name} color={color} setName={setName} setColor={setColor} />}
                            confirmAction={() => {
                                updateTag(tag._id, name, color);
                                fetchTasks();
                                fetchList();
                            }}
                            disableConfirm={!name || !colorRegex.test(color)}
                        />
                        <DeleteIcon className={classes.iconButton} onClick={() => {
                            deleteTag(tag._id);
                            fetchTasks();
                            fetchList();
                        }}/>
                    </ListItemIcon>}
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