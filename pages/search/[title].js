import Layout from "../../components/Layout"
import { API_KEY, BASE_URL, img_500 } from "../../requests"
import Image from "next/image"

export const getServerSideProps = async(context)=>{
    const name = context.query.title
    const data = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${name}`)
    const search = await data.json()

    return {
        props:{search}
    }
}

const SearchPage = ({search}) => {
    
    const movie = search.results

  return (
    <Layout trending={movie}>
    <div className="container mx-auto">
    <div className="grid grid-cols-1 min-[385px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {movie.map((mov)=>{
            return(
                <div className="w-full flex">
                    <div className="relative w-60 h-80">
                    <Image src={`${img_500}${mov.poster_path || mov.backdrop_path}`} alt='poster' fill className='object-cover'/>
                    </div>
                </div>
            )
        })}
    </div>
    </div>
    </Layout>
  )
}

export default SearchPage