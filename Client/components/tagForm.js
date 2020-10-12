import React, {useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";
import { GithubPicker } from "react-color";

const useStyles = makeStyles(() => ({
    textInput: {
        marginBottom: "15px"
    },
    colorPicker: {
        minWidth: "220px"
    },
}));

const tagForm = ({tag, name, color, setName, setColor}) => {
    const classes = useStyles();

    useEffect(() => {
        setName(tag ? tag.text : "");
        setColor(tag ? tag.color: "");
    }, [])

    return (
        <div>
            <TextField label="Name"
                       color="secondary"
                       value={name}
                       className={classes.textInput}
                       onChange={e => setName(e.target.value)}
            />
            <br/>
            <TextField label="Color"
                       color="secondary"
                       value={color}
                       className={classes.textInput}
                       onChange={e => setColor(e.target.value)}
            />
            <br/>
            <GithubPicker
                color={color}
                onChangeComplete={newColor => setColor(newColor.hex)}
                className={classes.colorPicker}
            />
        </div>
    )
}

export default tagForm;