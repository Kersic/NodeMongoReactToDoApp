import React, {useContext, useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {TagsContext} from "../contexts/tagsProvider";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const useStyles = makeStyles(() => ({
    textInput: {
        marginBottom: "15px"
    },
    formControl: {
        width: "170px",
        marginBottom: "15px"
    },
    selectItem: {
        display: "flex",
        alignItems: "center"
    }
}));

const ListForm = ({list, name, isDone, tagId, setName, setIsDone, setTagId}) => {
    const classes = useStyles();
    const { tags } = useContext(TagsContext);

    useEffect(() => {
        setName(list ? list.name : "");
        setIsDone(list ? list.isDone : false);
        setTagId(list && list.tag ? list.tag._id : "empty");
    }, [])

    return (
        <div>
            <div className={classes.selectItem}>
                <p>Done: </p>
                <Switch
                    checked={isDone}
                    onChange={event => setIsDone(event.target.checked)}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
            <TextField label="Name"
                       color="secondary"
                       value={name}
                       className={classes.textInput}
                       onChange={e => setName(e.target.value)}
            />
            <br/>
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
            <br/>
        </div>
    )
}

export default ListForm;