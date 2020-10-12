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
        </div>
    )
}

export default tagForm;