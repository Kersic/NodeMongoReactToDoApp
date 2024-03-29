import React, {createContext, useEffect, useState} from "react";
import {httpDelete, httpGet, httpPost, httpPut} from "../fetcher";
import Loader from "../components/Loader";

export const TagsContext = createContext([]);

export function TagsProvider({ children }) {
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        fetchTags();
    }, []);

    const fetchTags = () => {
        httpGet(process.env.SERVER_URL + "tag", setIsLoading, data => {
            setTags(data);
        });
    }

    const postTag = (name, color) => {
        httpPost(process.env.SERVER_URL + "tag", {text: name, color: color}, setIsLoading, () => {
            fetchTags();
        });
    }

    const updateTag = (id, name, color, callback) => {
        httpPut(process.env.SERVER_URL + `tag/${id}`, {text: name, color: color}, setIsLoading, () => {
            fetchTags();
            callback();
        });
    }

    const deleteTag = (id, callback) => {
        httpDelete(process.env.SERVER_URL + `tag/${id}`, setIsLoading, () => {
            fetchTags();
            callback();
        });
    }

    return (
        <TagsContext.Provider value={{ tags, postTag, updateTag, deleteTag }}>
            <Loader isLoading={isLoading} />
            {children}
        </TagsContext.Provider>
    );
}