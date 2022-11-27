import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import { useContext, useEffect, useState } from "react"
import Modal from './Modal'
// import { AuthContext } from './AuthContext'
import { useRouter } from 'next/router'

const Layout = ({children,trending}) => {
  const[movie,setMovie] = useState(null)
  const[open,setOpen] = useState(false)
//   const { currentUser } = useContext(AuthContext)
  const router = useRouter()

  useEffect(()=>{
    setMovie(trending[Math.floor(Math.random() * trending.length)])
  },[trending])

  return (
    <div className={`relative w-full h-screen top-0 left-0 lg:min-h-[140vh] bg-gradient-to-b scrollbar from-black/10 to-black ${!open && '!h-screen'}`}>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movies app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className='w-full min-h-screen'>
        <Banner movie={movie} setOpen={setOpen} open={open}/>
        <section className='-mt-24 pl-8'>
            {children}      
        </section>
      </main>
      { open? <Modal setOpen={setOpen} open={open} movie={movie}/>:''}
    </div>
  )
}

export default Layout