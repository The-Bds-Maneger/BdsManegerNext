import Head from "next/head";

// CSS
import "../styles/NavBar.css";
import "../styles/globals.css";

// Navbar
import Navbar from "./NavBar";

function BdsManeger({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="https://raw.githubusercontent.com/The-Bds-Maneger/Bds-Maneger-html-assets/main/images/mcpe.ico" />
      </Head>
      <Navbar />
      <div>
        <div className="root">
          <Component {...pageProps} />
        </div>
      </div> 
    </>
  )
}

export default BdsManeger;