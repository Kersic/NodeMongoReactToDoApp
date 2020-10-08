import React, {useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textInput: {
        marginBottom: "15px"
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
            <TextField id="standard-required" label="Name"
                       color="secondary"
                       defaultValue={name}
                       className={classes.textInput}
                       onChange={e => setName(e.target.value)}
            />
            <br/>
            <TextField id="standard-required" label="Color"
                       color="secondary"
                       defaultValue={color}
                       className={classes.textInput}
                       onChange={e => setColor(e.target.value)}
            />
        </div>
    )
}

export default tagForm;