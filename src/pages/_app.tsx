import type {AppProps} from 'next/app'
import "../app/globals.css"
import {useRouter} from "next/router";

export default function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()
    if (router.pathname.includes("read")) {
        return <Component {...pageProps} />
    }
    return <>
       <Navbar/>
        <Component {...pageProps} />
    </>
}

function Navbar() {
  return <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <a href="/" className="text-gray-800 dark:text-gray-200 mx-1.5 sm:mx-6">Main</a>

          <a href="/catalog" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">catalog</a>

          <a href="#" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">forum</a>

          <a href="#" className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6">blog</a>

      </div>
  </nav>
}