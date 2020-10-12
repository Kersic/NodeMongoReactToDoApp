import React, {createContext, useEffect, useState} from "react";
import axios from 'axios';

export const ListsContext = createContext([]);

export function ListsProvider({ children }) {
    const [lists, setLists] = useState([]);
    useEffect(()=> {
        fetch();
    }, []);

    const fetch = async () => {
        const res = await axios.get(process.env.SERVER_URL + "list");
        setLists(res.data);
    }

    return (
        <ListsContext.Provider value={{ lists, fetch }}>
            {children}
        </ListsContext.Provider>
    );
}