import Layout from "../../components/Layout"
import { API_KEY, BASE_URL, img_500, unavailable_img } from "../../requests"
import Image from "next/image"
import Link from "next/link"
import { MdArrowBackIos,MdArrowForwardIos } from 'react-icons/md'

export const getServerSideProps = async(context)=>{
    const {params} = context.query;
    let page = Number(context.query.page) || 1;

    const data = await fetch(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${params}&page=${page}`)
    const search = await data.json()

    return {
        props:{search,page,params}
    }
}

const SearchPage = ({search,page,params}) => {
    
    const movie = search.results
    const totalPages = search.total_pages
    let currentPage = search.page

  return (
    <Layout trending={movie}>
    <div className="container mx-auto">
    <div className="grid grid-cols-1 min-[385px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {movie.map((mov)=>{
            return(
                <div key={mov.id} className="w-full flex">
                    <div className="relative w-60 h-80">
                    <Image src={mov.poster_path?`${img_500}${mov.poster_path || mov.backdrop_path }`: unavailable_img} alt={mov.original_title || mov.title || 'poster'} fill className='object-cover'/>
                    </div>
                </div>
            )
        })}
    </div>
    <div className="text-white flex space-x-3 items-center py-10">
        <Link className="text-white" href={`/search/${params}/?page=${page - 1}`}>
            <button className={currentPage <= 1?'hidden':'py-3 px-4 rounded-md bg-rose-600 m-2'}>
                <MdArrowBackIos/>
            </button>
        </Link>
            <span className="text-2xl">{currentPage}</span>
            <span className="text-2xl">. . . {totalPages}</span>
        <Link className="text-white" href={`/search/${params}/?page=${page + 1}`}>
            <button className={totalPages === page?'hidden':'py-3 px-4 rounded-md bg-rose-600 m-2'}>
                <MdArrowForwardIos/>
            </button>
        </Link>
    </div>
    </div>
    </Layout>
  )
}

export default SearchPage