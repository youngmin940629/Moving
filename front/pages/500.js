import Head from "next/head";
import AppLayout from "../components/AppLayout";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 | moving</title>
      </Head>
      <AppLayout>
        <img src="/img/500.png" className="not-found-img"/>
      </AppLayout>    
      <style jsx>
        {`
          .not-found-img { display: block; margin: 0 auto; }
        `}
      </style>
    </>
  )
}