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
import theme, {listIconsStyle} from "../src/theme";
import {toDatePickerString} from "../helpers";
import TaskForm from "./taskForm";

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
}));

const Tasks = () => {
    const classes = useStyles();

    const { tasks, postTask, updateTask, deleteTask, isTaskDone } = useContext(TasksContext);
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
        setReminder(toDatePickerString(new Date(task.reminderDate)));
        setIsDone(task.isDone);
        e.stopPropagation();
    }

    const addNewTask = () => {
        setEditingId("new");
        setText("");
        setTagId("empty");
        setDeadline(toDatePickerString(new Date()));
        setReminder(toDatePickerString(new Date()));
        setIsDone(false);
    }

    const deleteHandle = (e, id) => {
        deleteTask(id);
        e.stopPropagation();
    }

    const confirmEditing = (e) => {
        updateTask(editingId, text, deadline, remainder, isDone, tagId === "empty" ? null : tagId);
        setEditingId(null);
        e.stopPropagation();
    }

    const confirmAdding = (e) => {
        postTask(text, deadline, remainder, isDone, tagId === "empty" ? null : tagId);
        setEditingId(null);
        e.stopPropagation();
    }

    const toggleDone = (task) => {
        const tasksCopy = tasks;
        const index = tasks.findIndex(t => t._id === task._id);
        tasksCopy[index].isDone = !tasksCopy[index].isDone;
        isTaskDone(task._id, task.isDone);
    }

    const cancelEditing = (e) => {
        setEditingId(null);
        e.stopPropagation();
    }

    return (
        <List className={classes.todoList} component="nav" aria-label="main mailbox folders">
            {tasks && tasks.map(task => {
                const showReminder = new Date(task.reminderDate) < new Date();
                if (task._id === editingId)
                    return (
                        <TaskForm
                            key={task._id}
                            tagId={tagId}
                            setTagId={setTagId}
                            text={text}
                            setText={setText}
                            deadline={deadline}
                            setDeadline={setDeadline}
                            remainder={remainder}
                            setReminder={setReminder}
                            confirmEditing={confirmEditing}
                            cancelEditing={cancelEditing}
                        />
                    )
                else
                    return (
                        <ListItem key={task._id} button onClick={() => toggleDone(task)}>
                            <ListItemIcon>
                                {task.isDone ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                            </ListItemIcon>
                            <div className={classes.tagWrapper}>
                                {task.tag && <Chip style={{maxWidth: "80%", backgroundColor: task.tag.color}} label={task.tag.text}/>}
                            </div>
                            <div style={{color: showReminder ? theme.palette.primary.main : ""}} className={classes.dateWrapper}>{new Date(task.deadline).toDateString()}</div>
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
            <TaskForm
                tagId={tagId}
                setTagId={setTagId}
                text={text}
                setText={setText}
                deadline={deadline}
                setDeadline={setDeadline}
                remainder={remainder}
                setReminder={setReminder}
                confirmEditing={confirmAdding}
                cancelEditing={cancelEditing}
            />
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