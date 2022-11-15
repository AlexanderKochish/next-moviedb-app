import Image from "next/image"
import { useEffect, useState } from "react"
import { img_origin } from "../requests"

const Banner = ({trending}) => {
    const[movie,setMovie] = useState(null)
    console.log(movie)
    useEffect(()=>{
        setMovie(trending[Math.floor(Math.random() * trending.length)])
    },[trending])
    return (
    <div className="w-full h-screen flex flex-col justify-center ">
        <div className="w-full h-screen absolute top-0 left-0 -z-10 ">
            <Image src={`${img_origin}${movie?.backdrop_path || movie?.poster_path}`} alt='banner' fill className="object-cover"/>
        </div>
            
        <div className="text-white space-y-2 md:space-y-4 px-5">
            <h2 className="text-4xl font-semibold text-shadow-lg md:text-6xl">{movie?.title || movie?.original_title || movie?.name}</h2>
            <p className="text-1xl text-shadow-lg md:text-2xl">{movie?.overview}</p>
            <div className="space-x-2">
                <button className="bg-rose-700 py-2 px-6 rounded-xl">Play</button>
                <button className="bg-gray-500 py-2 px-6 rounded-xl">More info</button>
            </div>
        </div>
    </div>
  )
}

export default Banner