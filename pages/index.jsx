import React from 'react';
import Head from 'next/head'
import LastFMData from '../components/FetchData/FetchData';
import styled from 'styled-components';

const Main = styled.main`
    display: block;
    height: 100%;
    margin: 0 auto;
    width: calc(100% - 20px);
`;

const Home = () => {
    return (
        <section>
            <Head>
                <title>My Playlist</title>
                <meta name="description" content="assignment of LabelA"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Main>
                <LastFMData artist={'Drake'} APIkey={'d732731be2f5f0ec4b10e5a3607d7090'}/>
            </Main>
            <footer>

            </footer>
        </section>
    )
};

export default Home
