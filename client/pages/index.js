import React from "react";
import axios from 'axios';
import MainView from "./mainView";

const Index = ({tasks}) => {
    console.log(tasks);
    return (

            <MainView />
          

    )
}

Index.getInitialProps = async () => {
    const res = await axios.get("http://localhost:3001/task");
    const {data} = res;
    return { tasks: data }
}

export default Index;