import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import MovieRow from '../components/MovieRow'
import requests from '../requests'
import { useEffect, useState } from "react"
import Modal from '../components/Modal'
import ModalMovRow from '../components/ModalMovRow'

export default function Home({trending,discover,topRated,popular}) {
  const[movId,setMovieId] = useState(0)
  const[movie,setMovie] = useState(null)
  const[open,setOpen] = useState(false)
  const[openCardMovie,setOpenCardMovie] = useState(false)

    useEffect(()=>{
        setMovie(trending[Math.floor(Math.random() * trending.length)])
    },[trending])
  return (
    <div className='relative w-full h-screen top-0 left-0 bottom-0 lg:min-h-[140vh] bg-gradient-to-b from-black/10 to-black'>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movies app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className='w-full min-h-screen'>
        <Banner movie={movie} setOpen={setOpen} open={open}/>
        <section className='-mt-28 pl-8'>
          <MovieRow title='Trending Movies' movie={trending} setOpen={setOpenCardMovie} open={openCardMovie} setMovieId={setMovieId} movId={movId}/> 
          <MovieRow title='Discover Movies' movie={discover} setOpen={setOpenCardMovie} open={openCardMovie} setMovieId={setMovieId} movId={movId}/>
          <MovieRow title='Top Rated' movie={topRated} setOpen={setOpenCardMovie} open={openCardMovie} setMovieId={setMovieId} movId={movId}/>
          <MovieRow title='Popular Movies' movie={popular} setOpen={setOpenCardMovie} open={openCardMovie} setMovieId={setMovieId} movId={movId}/>
        </section>
      </main>
      { open? <Modal setOpen={setOpen} open={open} movie={movie}/>:''}
      { openCardMovie? <ModalMovRow setOpen={setOpenCardMovie} open={openCardMovie} movId={movId}/>:''}
    </div>
  )
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