import React, {useEffect} from "react";
import Router from 'next/router'

const Index = () => {
    useEffect(() => {
        Router.push('/list')
    });
    return (
        <p>Index</p>
    )
}

Index.getInitialProps = (ctx) => {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: "/list" });
        ctx.res.end();
    }
    return { props : null };
};

export default Index;