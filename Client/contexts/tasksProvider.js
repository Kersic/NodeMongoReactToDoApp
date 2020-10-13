import React, {createContext, useEffect, useState} from "react";
import {httpDelete, httpGet, httpPost, httpPut} from "../fetcher";
import Loader from "../components/Loader";

export const TasksContext = createContext([]);

export function TasksProvider({ children, initialTasks, listId }) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        setTasks(initialTasks);
    }, [initialTasks]);

    const fetchTasks = () => {
        httpGet(process.env.SERVER_URL + `task/${listId}`, setIsLoading, data => {
            setTasks(data);
        });
    }

    const postTask = (text, deadline, remainder, isDone, tag) => {
        httpPost(
            process.env.SERVER_URL + "task",
            {
                text: text,
                deadline: deadline,
                reminderDate: remainder,
                isDone: isDone,
                tag: tag,
                list: listId ? listId : null,
            },
            setIsLoading, () => {
            fetchTasks();
        });
    }

    const isTaskDone = (id, isDone) => {
        httpPost(
            process.env.SERVER_URL + `task/isDone/${id}`,
            {
                isDone: isDone,
            },
            setIsLoading, null, () => {
                fetchTasks();
            });
    }

    const updateTask = (id, text, deadline, remainder, isDone, tag) => {
        httpPut(
            process.env.SERVER_URL + `task/${id}`,
            {
                text: text,
                deadline: deadline,
                reminderDate: remainder,
                isDone: isDone,
                tag: tag,
                list: listId ? listId : null,
            },
            setIsLoading, () => {
            fetchTasks();
        });
    }

    const deleteTask = (id) => {
        httpDelete(process.env.SERVER_URL + `task/${id}`, setIsLoading, () => {
            fetchTasks();
        });
    }

    return (
        <TasksContext.Provider value={{ tasks, fetchTasks, postTask, updateTask, deleteTask, isTaskDone }}>
            <Loader isLoading={isLoading} />
            {children}
        </TasksContext.Provider>
    );
}