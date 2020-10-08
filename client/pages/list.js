import React from "react";
import axios from 'axios';
import MainView from "../components/mainView";

const List = ({tasks, tags, lists}) => {
    return (
        <MainView tasks={tasks} tags={tags} lists={lists}/>
    )
}

List.getInitialProps = async ({query}) => {
    console.log(query.id);
    let res = await axios.get(process.env.SERVER_URL + "task");
    const tasks = res.data;
    res = await axios.get(process.env.SERVER_URL + "tag");
    const tags = res.data;
    res = await axios.get(process.env.SERVER_URL + "list");
    const lists = res.data;
    return { tasks: tasks, tags: tags, lists: lists }
}

export default List;