import React from "react";

const Index = () => {
    return (
        <p>Index</p>
    )
}

Index.getInitialProps = (ctx) => {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: "/list" });
        ctx.res.end();
    }
};

export default Index;