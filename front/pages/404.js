import Head from "next/head";
import AppLayout from "../components/AppLayout";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 | moving</title>
      </Head>
      <AppLayout>
        <img src="/img/404.png" className="not-found-img"/>
      </AppLayout>    
      <style jsx>
        {`
          .not-found-img { display: block; margin: 20px auto; }
        `}
      </style>
    </>
  )
}