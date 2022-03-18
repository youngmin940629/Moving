import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import BoardTable from '../components/boardTable';
import axios from "axios";

export default function Community({boards}) {

    return (
        <>
            <Head>
                <title>커뮤니티 | moving</title>
            </Head>
            <AppLayout>
                <BoardTable boards={boards}/>
            </AppLayout>
        </>
    );
};

export async function getServerSideProps(){
    let boards;
    await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/community/review/`)
        .then(res=>{
            try {
                boards = res.data;
                for(let i=0; i<boards.length; i++){
                    boards[i]["key"] = res.data[i].id;
                }
            }catch (error){
            }
        });
    return {
        props:{
            boards
        }
    };
}

