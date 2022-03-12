import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import '../src/App.css';
import wrapper from '../store/configureStore';

const App = ({ Component, pageProps }) => {
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
