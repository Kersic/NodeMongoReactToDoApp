import React, {createContext, useEffect, useState} from "react";
import {httpDelete, httpGet, httpPost, httpPut} from "../fetcher";
import Loader from "../components/Loader";

export const TasksContext = createContext([]);

export function TasksProvider({ children, initialTasks }) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setTasks(initialTasks);
    }, [initialTasks]);

    // const fetchTasks = async () => {
    //     httpGet(process.env.SERVER_URL + "task", setIsLoading, data => {
    //         setTasks(data);
    //     });
    // }
    //
    // const postTasks = (name, color) => {
    //     httpPost(process.env.SERVER_URL + "task", {text: name, color: color}, setIsLoading, data => {
    //         fetchTasks();
    //     });
    // }
    //
    // const updateTasks = (id, name, color) => {
    //     httpPut(process.env.SERVER_URL + `task/${id}`, {text: name, color: color}, setIsLoading, data => {
    //         fetchTasks();
    //     });
    // }
    //
    // const deleteTasks = (id) => {
    //     httpDelete(process.env.SERVER_URL + `task/${id}`, setIsLoading, data => {
    //         fetchTasks();
    //     });
    // }

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            <Loader isLoading={isLoading} />
            {children}
        </TasksContext.Provider>
    );
}