import Image from "next/image"
import { useEffect } from "react"
import { img_500 } from "../requests"

const MovieCard = ({movie,setOpen,open,setMovieId,movId}) => {

    const handleClickImage = (id) => {
        setOpen(!open)
        setMovieId(id) 
    } 
  
  return (
    <div className="flex items-center" key={movie.id}>  
        <div className="relative z-10  w-40 h-60  flex items-center cursor-pointer">
            <Image onClick={()=>handleClickImage(movie.id)} src={`${img_500}/${movie?.poster_path || movie?.backdrop_path}`} alt={movie?.title || movie?.original_title || 'poster-movie'} fill className="rounded-2xl object-fill md:hover:scale-105 duration-300"/>
        </div>
    </div>
  )
}

export default MovieCard