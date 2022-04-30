import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";
import Head from "next/head";

export default props => {
    return (
        <Container>
            
            {/* using head, all childs automaticaclly move up to the head tag of out html document */}
            <Head style={{backgroundColor:"blue"}}>
            <link
                async
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
            />
            </Head>
            <Header />
            {props.children}
        </Container>
    );
};