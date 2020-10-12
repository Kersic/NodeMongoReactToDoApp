import React, {useContext} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddIcon from "@material-ui/icons/Add";
import Link from "next/link";
import {ListsContext} from "../contexts/listsProvider";

const Lists = () => {
    const { lists } = useContext(ListsContext);
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
                        <ListItem button  >
                            <ListItemIcon>
                                {list.tag ? <FiberManualRecordIcon style={{color: list.tag.color}} /> : <FiberManualRecordOutlinedIcon fontSize="small"/>}
                            </ListItemIcon>
                            <ListItemText primary={list.name} />
                        </ListItem>
                    </Link>
                )
            })}
            <ListItem button>
                <ListItemIcon><AddIcon/></ListItemIcon>
                <ListItemText primary={"Add"} />
            </ListItem>
        </>
    )
}

export default Lists;