import React, {useContext, useState} from "react"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import {TasksContext} from "../contexts/tasksProvider";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {listIconsStyle} from "../src/theme";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FormControl from "@material-ui/core/FormControl";
import {TagsContext} from "../contexts/tagsProvider";
import {toDatePickerString} from "../helpers";

const useStyles = makeStyles(() => ({
    ...listIconsStyle,
    todoList: {
        margin: "40px 2vw",
    },
    dateWrapper: {
        width: "140px"
    },
    tagWrapper: {
        width: "120px"
    },
    button: {
        marginLeft: "10px"
    },
    listItem: {
        display: "flex",
        justifyContent: "space-between"
    },
    inputsWrapper: {
        display: "flex",
        alignItems: "flex-end"
    },
    buttonsWrapper: {
        display: "flex",
        justifyContent: "flex-end"
    },
    inputs: {
        marginLeft:"10px",
    },

    formControl: {
        width: "170px",
    },
    selectItem: {
        display: "flex",
        alignItems: "center"
    }
}));

const Tasks = () => {
    const classes = useStyles();

    const { tasks, postTask, updateTask, deleteTask } = useContext(TasksContext);
    const { tags } = useContext(TagsContext);
    const [editingId, setEditingId] = useState(null);
    const [text, setText] = useState(null);
    const [tagId, setTagId] = useState("empty");
    const [deadline, setDeadline] = useState(toDatePickerString(new Date()));
    const [remainder, setReminder] = useState(toDatePickerString(new Date()));
    const [isDone, setIsDone] = useState(toDatePickerString(new Date()));

    const editTask = (e, task) => {
        setEditingId(task._id);
        setText(task.text);
        setTagId(task && task.tag ? task.tag._id : "empty");
        setDeadline(toDatePickerString(new Date(task.deadline)));
        setReminder(toDatePickerString(new Date (task.reminderDate)));
        setIsDone(task.isDone);
        e.stopPropagation();
    }

    const addNewTask = () => {
        setEditingId("new");
        setText("");
        setTagId("empty");
        setDeadline(toDatePickerString(new Date()));
        setReminder(toDatePickerString(new Date ()));
        setIsDone(false);
    }

    const deleteHandle = (e, id) => {
        deleteTask(id);
        e.stopPropagation();
    }

    const confirmEditing = (e) => {
        updateTask(editingId, text, deadline, remainder, isDone, tagId === "empty" ? null : tagId)
        e.stopPropagation();
        setEditingId(null);
    }

    const cancelEditing = (e) => {
        setEditingId(null);
        e.stopPropagation();
    }

    return (
        <List className={classes.todoList} component="nav" aria-label="main mailbox folders">
            {tasks && tasks.map(task => {
                if (task._id === editingId)
                    return (
                        <ListItem className={classes.listItem} key={task._id} button onClick={() => console.log("toggleDone")}>
                            <div className={classes.inputsWrapper}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Tag</InputLabel>
                                    <Select
                                        value={tagId}
                                        color="secondary"
                                        onChange={e => setTagId(e.target.value)}
                                    >
                                        <MenuItem value={"empty"}>
                                            <div className={classes.selectItem}>
                                                <div>Undefined</div>
                                            </div>
                                        </MenuItem>
                                        {tags.map(tag => (
                                            <MenuItem key={tag._id} value={tag._id}>
                                                <div className={classes.selectItem}>
                                                    <FiberManualRecordIcon style={{color: tag.color}} />
                                                    <div>{tag.text}</div>
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField color="secondary"
                                           value={text}
                                           label="Task"
                                           onChange={e => setText(e.target.value)}
                                           className={classes.inputs}
                                />
                                <TextField
                                    color="secondary"
                                    label="Deadline"
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className={classes.inputs}
                                />
                                <TextField
                                    color="secondary"
                                    label="Remainder"
                                    type="date"
                                    value={remainder}
                                    onChange={(e) => setReminder(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className={classes.inputs}
                                />
                            </div>
                            <div className={classes.buttonsWrapper}>
                                <Button variant="contained" color="default" className={classes.button} onClick={e=>confirmEditing(e)}>
                                    Confirm
                                </Button>
                                <Button variant="contained" color="primary" className={classes.button} onClick={e=>cancelEditing(e)}>
                                    Cancel
                                </Button>
                            </div>
                        </ListItem>
                    )
                else
                    return (
                        <ListItem key={task._id} button onClick={() => console.log("toggleDone")}>
                            <ListItemIcon>
                                {task.isDone ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                            </ListItemIcon>
                            <div className={classes.tagWrapper}>
                                {task.tag && <Chip style={{maxWidth: "80%", backgroundColor: task.tag.color}} label={task.tag.text}/>}
                            </div>
                            <div className={classes.dateWrapper}>{new Date(task.deadline).toDateString()}</div>
                            <ListItemText style={{textDecoration: task.isDone ? "line-through" : ""}}
                                          primary={task.text}/>
                            <EditIcon className={classes.iconButton} onClick={e => editTask(e, task)}/>
                            <DeleteIcon className={classes.iconButton} onClick={(e) => deleteHandle(e, task._id)}/>
                        </ListItem>
                    )
                }
            )}
            <Divider />
            {editingId === "new" &&
                <p>add new</p>
            }
            {editingId !== "new" &&
                <ListItem button onClick={addNewTask}>
                    <ListItemIcon><AddIcon/></ListItemIcon>
                    <ListItemText primary={"Add"} />
                </ListItem>
            }
        </List>
    )
}

export default Tasks;