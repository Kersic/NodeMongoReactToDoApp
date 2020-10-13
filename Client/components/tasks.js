import React, {useContext} from "react"
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

const useStyles = makeStyles((theme) => ({
    todoList: {
        margin: "40px 2vw",
    }
}));

const Tasks = () => {
    const classes = useStyles();
    const { tasks } = useContext(TasksContext);
    return (
        <List className={classes.todoList} component="nav" aria-label="main mailbox folders">
            {tasks && tasks.map(task => (
                <ListItem key={task._id} button>
                    <ListItemIcon>
                        {task.isDone ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                    </ListItemIcon>
                    <ListItemText primary={task.text} />
                </ListItem>
            ))}
            <Divider />
            <ListItem button>
                <ListItemIcon><AddIcon/></ListItemIcon>
                <ListItemText primary={"Add"} />
            </ListItem>
        </List>
    )
}

export default Tasks;