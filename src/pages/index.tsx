import { type NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>21/27 - Crypto Price</title>
      </Head>
      <main
        data-theme="cyberpunk"
        className="flex min-h-screen flex-col items-center gap-4"
      >
        <h1 className="m-6 text-4xl font-extrabold tracking-tight">
          21/27 - Crypto Price
        </h1>
      </main>
    </>
  )
}

export default Home
