import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import BoardTable from "../components/boardTable"

const Community = () => {
    return (
        <>
            <Head>
                <title>커뮤니티 | moving</title>
            </Head>
            <AppLayout>
                <BoardTable/>
            </AppLayout>

        </>
    );
};

export default Community;
