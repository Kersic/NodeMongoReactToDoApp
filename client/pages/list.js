import React from "react";
import axios from 'axios';
import MainView from "../components/mainView";

const List = ({tasks, tags, lists, query}) => {
    return (
        <MainView tasks={tasks} tags={tags} lists={lists} query={query}/>
    )
}

List.getInitialProps = async ({query}) => {
    let res = query.id ? await axios.get(process.env.SERVER_URL + `task/${query.id}`) : await axios.get(process.env.SERVER_URL + "task");
    const tasks = res.data;
    res = await axios.get(process.env.SERVER_URL + "tag");
    const tags = res.data;
    res = await axios.get(process.env.SERVER_URL + "list");
    const lists = res.data;
    return { tasks: tasks, tags: tags, lists: lists, query: query }
}

export default List;