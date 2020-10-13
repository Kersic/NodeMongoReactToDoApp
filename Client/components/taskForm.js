import React, {useContext} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import {makeStyles} from "@material-ui/core/styles";
import {TagsContext} from "../contexts/tagsProvider";

const useStyles = makeStyles(() => ({
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
}))

const TaskForm = ({tagId, setTagId, text, setText, deadline, setDeadline, remainder, setReminder, confirmEditing, cancelEditing}) => {
    const classes = useStyles();
    const { tags } = useContext(TagsContext);

    return (
        <ListItem className={classes.listItem} button>
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
                <Button variant="contained" color="default" className={classes.button} disabled={!text} onClick={e=>confirmEditing(e)}>
                    Confirm
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={e=>cancelEditing(e)}>
                    Cancel
                </Button>
            </div>
        </ListItem>
    )
}

export default TaskForm;