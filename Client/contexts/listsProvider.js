import React, {createContext, useEffect, useState} from "react";
import {httpDelete, httpGet, httpPost, httpPut} from "../fetcher";
import Loader from "../components/Loader";

export const ListsContext = createContext([]);

export function ListsProvider({ children }) {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        fetchList();
    }, []);

    const fetchList = async () => {
        httpGet(process.env.SERVER_URL + "list", setIsLoading, data => {
            setLists(data);
        });

    }

    const postList = (name, isDone, tagId) => {
        httpPost(process.env.SERVER_URL + "list", {name: name, isDone: isDone, tag: tagId}, setIsLoading, data => {
            fetchList();
        });
    }

    const updateList = (id, name, isDone, tagId) => {
        httpPut(process.env.SERVER_URL + `list/${id}`, {name: name, isDone: isDone, tag: tagId}, setIsLoading, data => {
            fetchList();
        });
    }

    const deleteList = (id) => {
        httpDelete(process.env.SERVER_URL + `list/${id}`, setIsLoading, data => {
            fetchList();
        });
    }

    return (
        <ListsContext.Provider value={{ lists, postList, updateList, deleteList }}>
            <Loader isLoading={isLoading} />
            {children}
        </ListsContext.Provider>
    );
}