import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import MovieRow from '../components/MovieRow'
import requests from '../requests'
import { useContext, useEffect, useState } from "react"
import Modal from '../components/Modal'
import { AuthContext } from '../components/AuthContext'
import { useRouter } from 'next/router'

export default function Home({trending,discover,topRated,popular}) {
  const[movId,setMovieId] = useState(0)
  const[movie,setMovie] = useState(null)
  const[open,setOpen] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()

  useEffect(()=>{
    setMovie(trending[Math.floor(Math.random() * trending.length)])
  },[trending])

    console.log(router)
  return<>
   {!currentUser? setTimeout(()=>router.replace('/sign_in'),2000):
    <div className={`relative w-full h-screen top-0 left-0 lg:min-h-[140vh] bg-gradient-to-b scrollbar from-black/10 to-black ${open && '!h-screen overflow-hidden'}`}>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movies app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className='w-full min-h-screen'>
        <Banner movie={movie} setOpen={setOpen} open={open}/>
        <section className='-mt-28 pl-8'>
          <MovieRow title='Trending Movies' movie={trending}  movId={movId}/> 
          <MovieRow title='Discover Movies' movie={discover}  movId={movId}/>
          <MovieRow title='Top Rated' movie={topRated}  movId={movId}/>
          <MovieRow title='Popular Movies' movie={popular}  movId={movId}/>
        </section>
      </main>
      { open? <Modal setOpen={setOpen} open={open} movie={movie}/>:''}
    </div>
  }
  </>
}

export const getServerSideProps = async () => {

  const [trending,discover,topRated,popular] = await Promise.all([
      fetch(`${requests.trending}`).then((response) => response.json()).catch((err)=>console.log(err)),
      fetch(`${requests.discover}`).then((response) => response.json()).catch((err)=>console.log(err)),
      fetch(`${requests.topRated}`).then((response) => response.json()).catch((err)=>console.log(err)),
      fetch(`${requests.popular}`).then((response) => response.json()).catch((err)=>console.log(err))
  ])
  return {
    props:{
      trending:trending.results,
      discover:discover.results,
      topRated:topRated.results,
      popular:popular.results
    }
  }
}