import Head from 'next/head'
import React,{useState,useEffect} from 'react'
import AppLayout from '../../components/AppLayout'
import MovieDetail from '../../components/MovieDetail'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default function Movie({id, detail}) {
  return (
    <>
    <Head>
      <title>영화 상세정보 | moving</title>
    </Head>
    <AppLayout>
      <MovieDetail id={id} detail={detail}></MovieDetail>
    </AppLayout>
    </>
  )
}

export async function getServerSideProps({params}){
  const id = params.id
  const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/${id}`)
  const detail = data.data[0]
  return {
    props:{
      id,
      detail,
    }
  };
}

