import React, {useEffect} from "react";
import Link from 'next/link';

const NextDemo = () => {

    console.log("client and server side");
    useEffect(() => {
        console.log("only server side");
    }, []);

    return (
        <div>
            <h3> NextDemo </h3>
            <Link href="/">
                <a>Client side routing</a>
            </Link>
        </div>
    )
}

NextDemo.getInitialProps = async () => {
    console.log("server OR client side");
    return { test: "test" }
}

//presaved response is returned form server on every request
// export async function getStaticProps() {
//     console.log("get static props");
//     try {
//         let res = await axios.get(process.env.SERVER_URL + "tag");
//         const tags = res.data;
//         res = await axios.get(process.env.SERVER_URL + "list");
//         const lists = res.data;
//         console.log(tags);
//         return { props: { tags: tags, lists: lists} }
//     } catch (e) {
//         console.log(e);
//         return { props: { tags: [], lists: []} }
//     }
// }

//called on every request
// export async function getServerSideProps() {
//     console.log("getServerSideProps");
//     try {
//         let res = await axios.get(process.env.SERVER_URL + "tag");
//         const tags = res.data;
//         res = await axios.get(process.env.SERVER_URL + "list");
//         const lists = res.data;
//         console.log(tags);
//         return { props: { tags: tags, lists: lists} }
//     } catch (e) {
//         console.log(e);
//         return { props: { tags: [], lists: []} }
//     }
//
// }

//deprecated: called on every request
// List.getInitialProps = async ({query}) => {
//     console.log("get initial props");
//     try {
//         let res = query.id ? await axios.get(process.env.SERVER_URL + `task/${query.id}`) : await axios.get(process.env.SERVER_URL + "task");
//         const tasks = res.data;
//         res = await axios.get(process.env.SERVER_URL + "tag");
//         const tags = res.data;
//         res = await axios.get(process.env.SERVER_URL + "list");
//         const lists = res.data;
//         return {tasks: tasks, tags: tags, lists: lists, query: query}
//     } catch (e) {
//         console.log(e);
//         return {tasks: [], tags: [], lists: [], query: query}
//     }
// }


export default NextDemo;