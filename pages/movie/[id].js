import Image from "next/image"
import { API_KEY, BASE_URL, img_500, img_origin } from "../../requests"
import { MdStar } from 'react-icons/md'
import Link from "next/link"
import { ImHome } from 'react-icons/im'
import ReactPlayer from "react-player"
import { FaPlay,FaPause } from 'react-icons/fa'
import { useEffect, useRef, useState } from "react"
import MovieCast from "../../components/MovieCast"
import { MdArrowBackIos,MdArrowForwardIos } from 'react-icons/md'

export const getServerSideProps = async (context) => {
    const movId = context.query.id

    const [movie,video,credits] = await Promise.all([
        fetch(`${BASE_URL}movie/${movId}?api_key=${API_KEY}&language=en-US`).then( res => res.json()),
        fetch(`${BASE_URL}movie/${movId}/videos?api_key=${API_KEY}&language=en-US`).then( res => res.json()),
        fetch(`${BASE_URL}movie/${movId}/credits?api_key=${API_KEY}&language=en-US&page=1`).then( res => res.json())
    ]) 

    return{
        props:{
            movie,
            video,
            credits
        }
    }
}

const Movie = ({movie,video,credits}) => {
    const[play,setPlay] = useState(false)
    const ref = useRef(null)
    
    useEffect(()=>{
        const ScrollinVideo = () =>{
           return play === true? window.scrollBy({top: 2000, behavior: "smooth"}) : null
        }
        ScrollinVideo()
    },[])

    const ScrollActors = (arrow) =>{
        if(ref.current){
            const { scrollLeft,clientWidth } = ref.current
            const scrollTo = arrow === 'left'? scrollLeft - clientWidth : scrollLeft + clientWidth

            ref.current.scrollTo({left:scrollTo,behavior:'smooth'})
        }
    }
    
    const {cast} = credits || {}
    const {
        backdrop_path,
        original_language,
        original_title,
        overview,
        popularity,
        poster_path,
        release_date,
        status,
        title,
        vote_average,
        vote_count
    } = movie || {}
  return (
    <div className="text-white relative top-0 left-0 w-full h-screen lg:min-h-screen bg-gradient-to-b from-black/50 to-black">
        <div className="w-full h-screen absolute top-0 left-0 -z-10 ">
            <Image src={`${img_origin}${backdrop_path || poster_path}`} alt='poster' fill className="object-cover"/>
        </div>
            <Link href={'/'}>
                <div className="absolute flex items-center animate-pulse hover:bg-rose-700 duration-300 top-5 bg-slate-900 w-16 h-14 rounded-r-xl">
                    <ImHome className="absolute m-4 w-8 h-8"/>
                </div>
            </Link>
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-center p-6 w-full min-h-screen">
            <div className="w-60 h-80 md:w-96 md:h-[500px] m-4">
                <div className="relative w-full h-full top-0 left-0">
                    <Image src={`${img_500}${poster_path || backdrop_path}`} fill className="object-cover rounded-xl shadow-lg shadow-black"/>
                </div>
            </div>
                <div className="flex w-3/4 md:w-2/3 lg:w-1/2 flex-col m-4 space-y-5">
                    <h2 className="text-2xl lg:text-4xl font-semibold text-shadow-lg">{`${original_title || poster_path}`}</h2>
                    <p className="inline-flex items-center space-x-3"><MdStar className="text-yellow-500"/> <span className="shadow-md">{popularity}</span></p>
                    <p className="text-xl lg:text-2xl text-shadow-lg text-gray-300">{overview}</p>
                    <p className="text-shadow-sm"><span className="text-gray-400">Release date:</span> {release_date}</p>
                    <p className="text-shadow-sm"><span className="text-gray-400">Status:</span> {status}</p>
                    <p className="text-shadow-sm"><span className="text-gray-400">Original language:</span> {original_language}</p>
                    <button className="inline-flex items-center bg-rose-600 py-2 px-4 rounded-md self-start" onClick={()=>setPlay(!play)}>
                        {play? <FaPause className="mr-2"/> : <FaPlay className="mr-2"/>}Play</button>
                </div> 
            </div>
            <div className="group relative flex items-center">
            <MdArrowBackIos onClick={()=>ScrollActors('left')} 
                className='absolute cursor-pointer opacity-0 group-hover:opacity-100 left-2 z-20 w-10 h-10 text-white'
                />
            <div ref={ref} className="flex -mt-10 mb-10 overflow-hidden space-x-2 md:space-x-4">
            {cast.map((cast)=><MovieCast key={cast.id} cast={cast}/>)}
            </div> 
            <MdArrowForwardIos onClick={()=>ScrollActors('right')} 
                className='absolute cursor-pointer opacity-0 group-hover:opacity-100 right-2 z-20 w-10 h-10 text-white'
                />
        </div>
        </div>
        <div className="w-full h-screen">
            <ReactPlayer 
            url={`https://www.youtube.com/watch?v=${video.results[0]?.key}`}
            width='100%'
            height='100%' 
            controls={true}
            playing={play}
            />
        </div>
    </div>
  )
}

export default Movie