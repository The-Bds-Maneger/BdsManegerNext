import "../styles/globals.css";
import Head from "next/head";

function BdsManeger({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="https://raw.githubusercontent.com/The-Bds-Maneger/Bds-Maneger-html-assets/main/images/mcpe.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default BdsManeger
