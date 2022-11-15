import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import MovieRow from '../components/MovieRow'
import requests from '../requests'

export default function Home({trending,discover,topRated,popular}) {
  
  return (
    <div className='relative w-full h-screen top-0 left-0 bottom-0 lg:min-h-[140vh] bg-gradient-to-b from-black/10 to-black'>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Movies app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className='w-full min-h-screen'>
        <Banner trending={trending}/>
        <section className='-mt-28 pl-8'>
          <MovieRow title='Trending Movies' movie={trending}/> 
          <MovieRow title='Discover Movies' movie={discover}/>
          <MovieRow title='Top Rated' movie={topRated}/>
          <MovieRow title='Popular Movies' movie={popular}/>
        </section>
      </main>
      {/* <Modal/>  */}
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