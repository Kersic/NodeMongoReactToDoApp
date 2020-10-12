import React, {useContext, useEffect, useState} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import {ListsContext} from "../contexts/listsProvider";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import {listIconsStyle} from "../src/theme";
import ModalButton from "./modalButton";
import ListForm from "./listForm";
import {colorRegex} from "../helpers";

const useStyles = makeStyles(() => ({
    ...listIconsStyle,
}));

const Lists = () => {
    const classes = useStyles();
    const { lists, postList, updateList, deleteList } = useContext(ListsContext);
    const [hoverId, setHoveredId] = useState("");
    const [name, setName] = useState("");
    const [isDone, setIsDone] = useState(false);
    const [tagId, setTagId] = useState("empty");

    return (
        <>
            <Link href={`list?id=`}>
                <ListItem button>
                    <ListItemIcon><FiberManualRecordOutlinedIcon fontSize="small"/></ListItemIcon>
                    <ListItemText primary={"All"} />
                </ListItem>
            </Link>
            {lists && lists.map(list => {
                return (
                    <Link href={`list?id=${list._id}`} key={list._id}>
                        <ListItem button onMouseLeave={() => setHoveredId("")} onMouseEnter={()=> setHoveredId(list._id)}>
                            <ListItemIcon>
                                {list.tag ? <FiberManualRecordIcon style={{color: list.tag.color}} /> : <FiberManualRecordOutlinedIcon fontSize="small"/>}
                            </ListItemIcon>
                            <ListItemText style={{textDecoration: list.isDone ? "line-through" : ""}} primary={list.name} />
                            {hoverId === list._id && <ListItemIcon>
                                <ModalButton
                                    title={"Add List"}
                                    button={
                                        <EditIcon className={classes.iconButton}/>
                                    }
                                    content={
                                        <ListForm list={list} name={name} setName={setName} isDone={isDone} setIsDone={setIsDone} tagId={tagId} setTagId={setTagId}/>
                                    }
                                    confirmAction={() => updateList(list._id, name, isDone, tagId === "empty" ? null : tagId)}
                                    disableConfirm={!name}
                                />
                                <DeleteIcon className={classes.iconButton} onClick={() => deleteList(list._id)}/>
                            </ListItemIcon>}
                        </ListItem>
                    </Link>
                )
            })}
            <ModalButton
                title={"Add List"}
                button={
                    <ListItem button>
                        <ListItemIcon><AddIcon/></ListItemIcon>
                        <ListItemText primary={"Add"} />
                    </ListItem>
                }
                content={
                    <ListForm name={name} setName={setName} isDone={isDone} setIsDone={setIsDone} tagId={tagId} setTagId={setTagId}/>
                }
                confirmAction={() => postList(name, isDone, tagId === "empty" ? null : tagId)}
                disableConfirm={!name}
            />
        </>
    )
}

export default Lists;