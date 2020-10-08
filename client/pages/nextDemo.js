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

export default NextDemo;