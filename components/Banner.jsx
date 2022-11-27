import Image from "next/image"
import { img_origin } from "../requests"
import { MdInfoOutline } from 'react-icons/md'
import { FaPlay } from 'react-icons/fa'
import { useState } from "react"

const Banner = ({movie,setOpen,open}) => {
    const[info,setInfo] = useState(false)
    
    return (
    <div className="w-full min-h-screen flex flex-col justify-center ">
        <div className="w-full h-screen absolute top-0 left-0 -z-10 ">
            <Image src={`${img_origin}${movie?.backdrop_path || movie?.poster_path}`} alt='banner' fill className="object-cover"/>
        </div>
            
        <div className="text-white mt-40 mb-48 space-y-2 md:space-y-4 px-5">
            <h2 className="text-3xl font-semibold text-shadow-lg sm:text-4xl lg:text-6xl">{movie?.title || movie?.original_title || movie?.name}</h2>
            <p className="text-shadow-lg md:text-1xl lg:text-2xl overflow-y-scroll scrollbar">{movie?.overview}</p>
            <div className={!info? 'flex flex-col':'hidden'}>
                <p className="text-shadow-sm"><span className="text-gray-400">Release date:</span> {movie?.release_date}</p>
                <p className="text-shadow-sm"><span className="text-gray-400">Status:</span> {movie?.status}</p>
                <p className="text-shadow-sm"><span className="text-gray-400">Original language:</span> {movie?.original_language}</p>
            </div>
            <div className="space-x-2 space-y-2">
                <button onClick={()=>setOpen(!open)} className="bg-rose-700 py-2 px-6 inline-flex items-center rounded-xl">
                    <FaPlay className="mr-2"/>Play
                </button>
                <button onClick={()=>setInfo(!info)} className="bg-gray-500 py-2 px-6 inline-flex items-center rounded-xl">
                    <MdInfoOutline className="mr-2"/>
                    More info
                </button>
            </div>
        </div>
    </div>
  )
}

export default Banner