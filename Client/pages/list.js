import React from "react";
import MainView from "../components/mainView";
import axios from "axios";
import {TasksProvider} from "../contexts/tasksProvider";

const List = ({tasks, query}) => {
    return (
        <TasksProvider initialTasks={tasks} listId={query.id}>
            <MainView query={query} />
        </TasksProvider>
    )
}

List.getInitialProps = async ({query}) => {
    try {
        const res = query.id ? await axios.get(process.env.SERVER_URL + `task/${query.id}`) : await axios.get(process.env.SERVER_URL + "task");
        const tasks = res.data;
        return {tasks: tasks, query: query}
    } catch (e) {
        console.log(e);
        return {tasks: [], query: query}
    }
}

export default List;