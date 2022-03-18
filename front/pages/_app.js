import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import '../src/App.css';
import wrapper from '../store/configureStore';
import axios from 'axios';

const App = ({ Component, pageProps }) => {
  useEffect(()=>{
    const token = localStorage.getItem('JWT token');
    if(token){
      axios({
        url:'http://localhost:8000/accounts/getuserpk/',
        method:'post',
        headers:{'Authorization':`JWT ${token}`}
      }).then(function(res){
        sessionStorage.setItem('id',res.data.pk)
      })
    }
    return ()=>{
      let id = sessionStorage.getItem('id');
      if(id){
        sessionStorage.removeItem('id');
      }
    }
  },[])
  return (
    <>
      <Head>
        <title>moving</title>
      </Head>
      <Component {...pageProps}/>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
